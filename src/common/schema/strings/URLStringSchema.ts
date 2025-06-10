import {z} from "zod";

/**
 * A Zod schema for validating a required URL string.
 *
 * This schema ensures the value is:
 * - A string (throws "Must be a string." if the type is incorrect)
 * - Not empty (throws "Required." if missing)
 * - A valid URL format (throws "Must be a valid URL." if the string is not a valid URL)
 *
 * @example
 * URLStringSchema.parse("https://example.com"); // ✅ Passes
 * URLStringSchema.parse("not a url"); // ❌ Throws error: "Must be a valid URL."
 */
export const URLStringSchema = z
    .string({required_error: "Required.", invalid_type_error: "Must be a string."})
    .url({message: "Must be a valid URL."});

/**
 * A TypeScript type representing a validated URL string.
 *
 * Inferred from {@link URLStringSchema}. Use this type when you want to ensure a string is a valid URL
 * (typically after runtime validation with Zod).
 *
 * @example
 * ```ts
 * const homepage: URLString = "https://example.com"; // ✅
 * ```
 */
export type URLString = z.infer<typeof URLStringSchema>;