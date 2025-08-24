import {z} from "zod";

/**
 * Zod schema that matches only an empty string (`""`) and transforms it into `undefined`.
 *
 * This is useful for placeholder inputs where an empty string should be treated
 * as `undefined` rather than a literal string.
 *
 * @example
 * ```ts
 * UndefinedEmptyStringLiteralSchema.parse(""); // ✅ returns undefined
 * UndefinedEmptyStringLiteralSchema.parse("abc"); // ❌ throws ZodError
 * ```
 */
export const UndefinedEmptyStringLiteralSchema = z
    .literal("")
    .transform(() => undefined);

/**
 * Type representing the result of `UndefinedEmptyStringLiteralSchema`.
 * Always `undefined`.
 */
export type UndefinedEmptyStringLiteral = z.infer<typeof UndefinedEmptyStringLiteralSchema>;