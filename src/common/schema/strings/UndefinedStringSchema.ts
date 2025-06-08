import {z} from "zod";

/**
 * Schema for an optional string that trims whitespace and converts empty strings to `undefined`.
 *
 * @remarks
 * - If the input is `undefined`, it passes validation as is.
 * - If the input is a string, it is trimmed of leading and trailing whitespace.
 * - If the trimmed string is empty (`""`), it transforms the value to `undefined`.
 * - If the input is not a string or `undefined`, validation fails with `"Must be a string."`.
 *
 * @example
 * ```ts
 * UndefinedStringSchema.parse("  hello ");  // Returns: "hello"
 * UndefinedStringSchema.parse("    ");      // Returns: undefined
 * UndefinedStringSchema.parse(undefined);   // Returns: undefined
 * UndefinedStringSchema.parse("");          // Returns: undefined
 * UndefinedStringSchema.parse(123);         // Throws validation error
 * ```
 */
export const UndefinedStringSchema = z
    .string({invalid_type_error: "Must be a string."})
    .trim()
    .optional()
    .transform(value => value || undefined);

/**
 * Type representing the output of {@link UndefinedStringSchema}.
 *
 * This type is either a trimmed non-empty string or `undefined` if the input was
 * `undefined` or an empty/whitespace-only string.
 */
export type UndefinedString = z.infer<typeof UndefinedStringSchema>;