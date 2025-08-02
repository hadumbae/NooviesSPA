import {z, ZodTypeAny} from "zod";
import {ParseError} from "@/common/errors/ParseError.ts";
import {DataValidationResults, ValidateDataParams} from "@/common/hooks/validation/validate-data/validateData.types.ts";

/**
 * Validates the provided data against a given Zod schema.
 *
 * @template TData - The type of the input data to validate.
 * @template TSchema - The Zod schema type to validate against.
 *
 * @param {ValidateDataParams<TData, TSchema>} params - The validation parameters.
 * @param {TData} params.data - The data to validate.
 * @param {TSchema} params.schema - The Zod schema used for validation.
 * @param {string} [params.message] - Optional custom error message if validation fails.
 *
 * @returns {DataValidationResults<z.infer<TSchema>>} The result of validation, including
 *  success status, validated data (if successful), and a ParseError instance (if failed).
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * const result = validateData({
 *   data: { name: "Alice", age: 30 },
 *   schema,
 * });
 *
 * if (result.success) {
 *   console.log("Validated data:", result.data);
 * } else {
 *   console.error("Validation failed:", result.error);
 * }
 * ```
 */
export default function validateData<TData = unknown, TSchema extends ZodTypeAny = ZodTypeAny>(
    {data, schema, message}: ValidateDataParams<TData, TSchema>
): DataValidationResults<z.infer<TSchema>> {
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