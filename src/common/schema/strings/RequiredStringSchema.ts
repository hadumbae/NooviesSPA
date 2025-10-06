import { z } from "zod";

/**
 * A Zod schema representing a required, non-empty string.
 *
 * @remarks
 * - The string is automatically trimmed of leading and trailing whitespace.
 * - If the value is missing, the error message will be `"Required"`.
 * - If the value is not a string, the error message will be `"Must be a string."`.
 *
 * @example
 * ```ts
 * const name = RequiredStringSchema.parse(" John Doe ");
 * console.log(name); // "John Doe"
 * ```
 */
export const RequiredStringSchema = z
    .string({ required_error: "Required", invalid_type_error: "Must be a string." })
    .trim();

/**
 * The TypeScript type inferred from `RequiredStringSchema`.
 *
 * @example
 * ```ts
 * const myString: RequiredString = "Hello";
 * ```
 */
export type RequiredString = z.infer<typeof RequiredStringSchema>;
