import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Parameters for validating data using a Zod schema.
 *
 * @template TSchema - The Zod schema type to validate against.
 */
interface Params<TSchema extends ZodTypeAny> {
    // The raw data to validate.
    data: unknown;

    // A Zod schema instance used to validate the data.
    schema: TSchema;

    // Optional custom error message used if validation fails.
    message?: string;

    // Optional loading indicator to defer validation while data is still being fetched.
    isPending?: boolean;
}

/**
 * The result of parsing and validating data.
 *
 * @template TReturn - The expected shape of validated data.
 */
interface ParseDataReturns<TReturn> {
    // The parsed and validated data, or `null` if validation failed or is pending.
    data: TReturn | null;

    // An error object if validation failed, or `null` if it passed or is pending.
    error: Error | null;
}

/**
 * A utility hook to validate arbitrary data against a provided Zod schema.
 * Useful for schema-safe client-side validation of fetched or user-provided data.
 *
 * @template TSchema - The Zod schema type used for validation.
 *
 * @param params - Configuration object containing data, schema, optional message, and pending flag.
 * @returns An object containing the parsed data or an error.
 *
 * @example
 * ```ts
 * const result = useValidateData({
 *   data: responseData,
 *   schema: MovieSchema,
 *   isPending: isLoading,
 * });
 *
 * if (result.error) {
 *   // Handle invalid data
 * }
 * ```
 */
export default function useValidateData<TSchema extends ZodTypeAny>(
    {data, schema, message, isPending}: Params<TSchema>
): ParseDataReturns<z.infer<TSchema>> {
    if (isPending) return {data: null, error: null};
    const {data: parsedData, success, error} = schema.safeParse(data);

    return {
        data: success ? parsedData : null,
        error: !success
            ? new ParseError({message: message || "Invalid Data.", errors: error.errors, raw: data})
            : null,
    };
}