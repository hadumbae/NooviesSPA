import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";
import {UseValidateDataResults} from "@/common/hooks/validation/use-validate-data/useValidateDataResults.ts";
import {UseValidateDataParams} from "@/common/hooks/validation/use-validate-data/useValidateDataParams.ts";

/**
 * Validates input data using a provided Zod schema.
 *
 * This hook is typically used after data is fetched to ensure it matches
 * an expected shape before usage in components. It supports three states:
 *
 * - **Pending**: validation is deferred until `isPending` is false
 * - **Success**: data is valid and parsed
 * - **Failure**: data is invalid and an error is returned
 *
 * @template TSchema - A Zod schema type used to validate and infer the result.
 *
 * @param params - The parameters required for validation:
 * - `data`: raw data to validate (usually from a fetch call)
 * - `schema`: a Zod schema to validate against
 * - `message`: optional custom error message
 * - `isPending`: indicates if data is still loading and should delay validation
 *
 * @returns A union result type representing one of:
 * - successful validation (`{ success: true, data, error: null }`)
 * - failed validation (`{ success: false, data: null, error: Error }`)
 * - pending state (`{ success: false, data: null, error: null }`)
 */
export default function useValidateData<TSchema extends ZodTypeAny>(params: UseValidateDataParams<TSchema>): UseValidateDataResults<z.infer<TSchema>> {
    const {data, schema, message, isPending} = params;

    if (isPending) {
        return {success: false, data: null, error: null};
    }

    const {data: parsedData, success, error} = schema.safeParse(data);

    if (success) {
        return {success: true, data: parsedData, error: null};
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