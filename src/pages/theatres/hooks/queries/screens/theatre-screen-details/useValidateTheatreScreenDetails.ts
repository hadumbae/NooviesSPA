import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {TheatreDetailsSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {ValidatedQueryReturns} from "@/common/type/validate-queries/ValidatedQueryReturns.ts";

type QueryParams = {
    /**
     * Whether the parent operation is still pending.
     * Passed to validation hooks to avoid running prematurely.
     */
    isPending: boolean;

    /**
     * The individual query results for theatre and screen details.
     */
    queries: {
        /**
         * React Query result for fetching theatre details.
         */
        theatre: UseQueryResult<TheatreDetails>;

        /**
         * React Query result for fetching screen details.
         */
        screen: UseQueryResult<ScreenDetails>;
    };
};

type ReturnData = {
    /**
     * Validated theatre details.
     */
    theatre: TheatreDetails;

    /**
     * Validated screen details.
     */
    screen: ScreenDetails;
};

/**
 * Validates theatre and screen details retrieved from React Query.
 *
 * - Uses {@link useValidateData} to ensure both the theatre and screen query
 *   results conform to their respective Zod schemas.
 * - Returns a combined success state, validated data, and error information.
 *
 * @param {QueryParams} params - The query results and pending state.
 * @param {boolean} params.isPending - Indicates if parent query execution is still pending.
 * @param {UseQueryResult<TheatreDetails>} params.queries.theatre - Theatre details query result.
 * @param {UseQueryResult<ScreenDetails>} params.queries.screen - Screen details query result.
 *
 * @returns {ValidatedQueryReturns<ReturnData>} Object containing:
 * - `data` — Combined validated theatre and screen data (or `null` if validation fails).
 * - `success` — `true` if both validations pass; otherwise `false`.
 * - `error` — First encountered validation error (if any).
 *
 * @example
 * ```ts
 * const validation = useValidateTheatreScreenDetails({
 *   isPending: isFetching,
 *   queries: { theatre: theatreQuery, screen: screenQuery }
 * });
 *
 * if (validation.success) {
 *   console.log(validation.data.theatre.name, validation.data.screen.name);
 * }
 * ```
 */
export default function useValidateTheatreScreenDetails(
    {isPending, queries: {theatre: {data: theatre}, screen: {data: screen}}}: QueryParams
): ValidatedQueryReturns<ReturnData> {
    const theatreValidation = useValidateData({
        isPending,
        data: theatre,
        schema: TheatreDetailsSchema,
        message: "Invalid Theatre Data."
    });

    const screenValidation = useValidateData({
        isPending,
        data: screen,
        schema: ScreenDetailsSchema,
        message: "Invalid Screen Data."
    });

    const success = theatreValidation.success && screenValidation.success;
    const error = theatreValidation.error ?? screenValidation.error ?? null;

    if (!success) {
        return {
            data: null,
            success: false,
            error,
        };
    }

    return {
        data: {theatre: theatreValidation.data, screen: screenValidation.data},
        success: true,
        error: null,
    }
}