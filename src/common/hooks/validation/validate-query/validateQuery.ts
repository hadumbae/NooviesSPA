import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";
import {
    ValidateQueryResults,
    ValidateQueryParams
} from "@/common/hooks/validation/validate-query/validateQuery.types.ts";

/**
 * Validates the result of a React Query against a Zod schema.
 *
 * This function:
 * - Returns a pending state result if the query is still loading.
 * - Returns a `ParseError` if the query errored or if validation failed.
 * - Returns validated and typed data if parsing succeeds.
 *
 * @template TData - Type of the raw data returned by the query before validation.
 * @template TError - Type of the query's error (defaults to `ParseError`).
 * @template TSchema - Type of the Zod schema used for validation.
 *
 * @param params - The parameters for validation.
 * @param params.query - The query result from React Query.
 * @param params.schema - The Zod schema used to validate and transform the query's data.
 * @param params.message - Optional custom error message for validation failures.
 *
 * @returns A validation result object:
 * - `success: true` with `data` of type `z.infer<TSchema>` if validation succeeds.
 * - `success: false` with a `ParseError` if validation fails or the query errors.
 *
 * @example
 * ```ts
 * const schema = z.object({ id: z.number(), name: z.string() });
 * const query = useQuery(...);
 *
 * const result = validateQuery({ query, schema });
 *
 * if (!result.success) {
 *   console.error(result.error);
 * } else {
 *   console.log(result.data.id);
 * }
 * ```
 */
export default function validateQuery<
    TData = unknown,
    TError extends Error = ParseError,
    TSchema extends ZodTypeAny = ZodTypeAny
>(
    params: ValidateQueryParams<TData, TError, TSchema>
): ValidateQueryResults<z.infer<TSchema>> {
    const {query, schema, message} = params;
    const {data, isPending, isError} = query;

    if (isPending) {
        return {
            success: false,
            data: null,
            error: null,
        };
    }

    if (isError) {
        return {
            success: false,
            data: null,
            error: new ParseError({
                message: "Error in query. Failed to fetch data.",
                errors: [],
            }),
        };
    }

    const {data: parsedData, success, error} = schema.safeParse(data);

    if (success) {
        return {
            success: true,
            data: parsedData,
            error: null,
        };
    }

    return {
        success: false,
        data: null,
        error: new ParseError({
            message: message ?? "Invalid Data.",
            errors: error.errors,
            raw: data,
        }),
    };


}