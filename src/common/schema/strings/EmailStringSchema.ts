import {z} from 'zod';
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";


/**
 * A Zod schema for validating non-empty, properly formatted email address strings.
 *
 * @remarks
 * - Based on {@link NonEmptyStringSchema}, so it:
 *   - Trims whitespace
 *   - Requires at least one non-whitespace character
 *   - Ensures the input is a string
 * - Additionally checks for valid email formatting using `.email()`.
 * - Returns `"Must be an email address."` if the format is invalid.
 *
 * @example
 * ```ts
 * EmailStringSchema.parse("user@example.com"); // ✅ Valid
 * EmailStringSchema.parse(""); // ❌ Throws "Must Not Be An Empty String"
 * EmailStringSchema.parse("invalid-email"); // ❌ Throws "Must be an email address."
 * ```
 */
export const EmailStringSchema = NonEmptyStringSchema
    .email({message: "Must be an email address."});

/**
 * A TypeScript type representing a validated email address string.
 *
 * @remarks
 * - Inferred from {@link EmailStringSchema}.
 * - Use when a string is guaranteed to be a properly formatted, non-empty email.
 */
export type EmailString = z.infer<typeof EmailStringSchema>;