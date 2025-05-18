import {ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Parameters for the `useValidateData` hook.
 *
 * @template TSchema - A Zod schema used to validate the incoming data.
 */
interface Params<TSchema extends ZodTypeAny> {
    /** The raw input data to validate. */
    data: unknown;

    /** A Zod schema that defines the shape and constraints of the expected data. */
    schema: TSchema;

    /** Optional error message to override the default when validation fails. */
    message?: string;
}

/**
 * The result returned from `useValidateData`, containing either parsed data or an error.
 *
 * @template TReturn - The inferred and validated data shape.
 */
interface ParseDataReturns<TReturn> {
    /** The validated data, or `null` if validation failed. */
    data: TReturn | null;

    /** A `ParseError` if validation failed, otherwise `null`. */
    error: Error | null;
}

/**
 * Validates arbitrary input data against a Zod schema and returns either
 * the parsed value or a structured `ParseError`.
 *
 * This hook is useful for ensuring data from external sources (e.g., API responses,
 * local storage, form values) conforms to expected shapes.
 *
 * @template TSchema - A Zod schema used for validation.
 * @template TReturn - The type derived from the schema.
 *
 * @param params - An object containing the data to validate, schema, and optional custom error message.
 *
 * @returns An object with either the validated `data` or a `ParseError`.
 *
 * @example
 * ```ts
 * const result = useValidateData({
 *   data: apiResponse,
 *   schema: UserSchema,
 *   message: "Failed to validate user data."
 * });
 *
 * if (result.error) {
 *   console.error(result.error.message);
 * } else {
 *   console.log("Validated user:", result.data);
 * }
 * ```
 */
export default function useValidateData<TSchema extends ZodTypeAny, TReturn>(
    {data, schema, message}: Params<TSchema>
): ParseDataReturns<TReturn> {
    const {data: parsedData, success, error} = schema.safeParse(data);

    return {
        data: success ? parsedData : null,
        error: !success ? new ParseError({message: message || "Invalid Data.", errors: error.errors, raw: data}) : null,
    };
}