import {z} from "zod";

/**
 * A Zod schema that validates an empty string literal (`""`).
 *
 * @remarks
 * - Accepts only the empty string (`""`) as a valid value.
 * - All other values will fail validation.
 * - Useful for distinguishing a deliberately empty field or sentinel value.
 * - Returns `"Invalid Value."` if validation fails.
 *
 * @example
 * ```ts
 * EmptyStringSchema.parse(""); // ✅ Valid
 * EmptyStringSchema.parse("not empty"); // ❌ Throws "Invalid Value."
 * ```
 */
export const EmptyStringSchema = z
    .literal("", {message: "Invalid Value."});

/**
 * A TypeScript type representing the literal empty string (`""`).
 *
 * @remarks
 * - Inferred from {@link EmptyStringSchema}.
 * - Often used to constrain values to an intentionally blank string.
 */
export type EmptyString = z.infer<typeof EmptyStringSchema>;