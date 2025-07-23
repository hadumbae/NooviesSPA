import {z, ZodTypeAny} from "zod";
import {UseValidateDataResults} from "@/common/hooks/validation/use-validate-data/useValidateDataResults.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {ValidateQueryParams} from "@/common/hooks/validation/validate-query/validateQuery.types.ts";

/**
 * Validates data from a React Query result against a Zod schema.
 *
 * This utility function handles three scenarios:
 *
 * - If the query is still loading or has errored, it returns `{ success: false, data: null, error: queryError }`.
 * - If the query succeeded and the data matches the schema, it returns `{ success: true, data, error: null }`.
 * - If the query succeeded but the data does not match the schema, it returns
 *   `{ success: false, data: null, error: ParseError }`.
 *
 * This is useful for ensuring that query data conforms to an expected shape before rendering.
 *
 * @template TData - Type of the raw data returned by the query.
 * @template TError - Type of the error returned by the query.
 * @template TSchema - The Zod schema type used for validation.
 *
 * @param params - The parameters for validation:
 *  - `query`: the query result to validate
 *  - `schema`: the Zod schema
 *  - `message`: optional custom message for the parse error
 *
 * @returns A result object containing:
 *  - `success: true` and validated `data` if valid
 *  - `success: false` and `error` otherwise
 *
 * @example
 * ```tsx
 * const result = validateQuery({
 *   query,
 *   schema: MySchema,
 *   message: "Invalid data received."
 * });
 *
 * if (!result.success) {
 *   return <ErrorComponent error={result.error} />;
 * }
 *
 * return <ContentComponent data={result.data} />;
 * ```
 */
export default function validateQuery<
    TData = unknown,
    TError extends Error = Error,
    TSchema extends ZodTypeAny = ZodTypeAny
>(
    params: ValidateQueryParams<TData, TError, TSchema>
): UseValidateDataResults<z.infer<TSchema>> {
    const {query, schema, message} = params;
    const {data, isPending, isError, error: queryError} = query;

    if (isError || isPending) {
        return {
            success: false,
            data: null,
            error: queryError ?? null,
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