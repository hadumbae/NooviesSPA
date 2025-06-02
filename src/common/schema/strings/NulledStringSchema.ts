import {z} from "zod";

/**
 * A Zod schema that parses a string and transforms falsy values (such as an empty string) into `null`.
 *
 * This is useful when handling optional string inputs—such as form fields—that should be treated as `null`
 * if left blank or filled with only whitespace.
 *
 * - If the input is not a string, it throws a validation error.
 * - Trims leading and trailing whitespace from the string.
 * - If the resulting string is falsy (e.g. an empty string), it is transformed to `null`.
 * - Otherwise, the trimmed string is returned.
 *
 * @example
 * ```ts
 * NulledStringSchema.parse("example") // => "example"
 * NulledStringSchema.parse("   ")     // => null
 * NulledStringSchema.parse("")       // => null
 * NulledStringSchema.parse(123)      // throws validation error
 * ```
 */
export const NulledStringSchema = z
    .union([
        z.literal(""),
        z.string({required_error: "Required", invalid_type_error: "Must be a string."}).trim(),
    ])
    .transform(value => value || null);

/**
 * Type inferred from {@link NulledStringSchema}.
 *
 * Represents a string that may also be `null`.
 */
export type NulledString = z.infer<typeof NulledStringSchema>;