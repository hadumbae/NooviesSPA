import {z} from "zod";

/**
 * A Zod schema that validates a non-empty, trimmed string.
 *
 * @remarks
 * - Ensures the value is a string.
 * - Trims leading and trailing whitespace.
 * - Throws an error if the string is empty after trimming.
 * - Custom error messages:
 *   - `"Required"` if the value is missing.
 *   - `"Must be a valid string."` if the type is incorrect.
 *   - `"Must Not Be An Empty String"` if the string is empty.
 */
export const NonEmptyStringSchema = z
    .string({required_error: "Required", invalid_type_error: "Must be a valid string."})
    .min(1, "Must Not Be An Empty String")
    .trim();

/**
 * A TypeScript type representing a validated non-empty string.
 *
 * @see {@link NonEmptyStringSchema} for validation rules.
 */
export type NonEmptyString = z.infer<typeof NonEmptyStringSchema>;