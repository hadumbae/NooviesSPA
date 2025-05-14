import {z} from "zod";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

/**
 * A Zod schema for validating a required number that may initially be `undefined`,
 * typically used with form libraries like React Hook Form.
 *
 * @remarks
 * - Accepts `undefined` at first (e.g., before a user provides input).
 * - Uses a refinement to enforce that the final value must be defined and truthy.
 *   - Returns `"Required."` if the value is `undefined`, `null`, `0`, or `NaN`.
 * - Inherits coercion and number validation from {@link RequiredNumberSchema}.
 * - Useful for number inputs in forms where the initial state is empty or unset.
 *
 * @note
 * The use of `!!value` means that `0` will be treated as invalid (falsy). If `0` should be allowed,
 * consider updating the refinement to check explicitly for `value !== undefined && !isNaN(value)`.
 *
 * @example
 * ```ts
 * RefinedNumberSchema.parse(42); // ✅ Valid
 * RefinedNumberSchema.parse("10"); // ✅ Valid (coerced)
 * RefinedNumberSchema.parse(undefined); // ❌ Throws "Required."
 * RefinedNumberSchema.parse(0); // ❌ Throws "Required." (falsy)
 * ```
 */
export const RefinedNumberSchema = z
    .union([z.undefined(), z.literal(""), RequiredNumberSchema])
    .refine((value) => value !== undefined && value !== "" && !isNaN(value), {message: "Required."});

/**
 * A TypeScript type representing a number validated via {@link RefinedNumberSchema}.
 *
 * @remarks
 * - Intended for use in forms where the number may start as `undefined`
 *   but must ultimately be defined and truthy.
 */
export type RefinedNumber = z.infer<typeof RefinedNumberSchema>;