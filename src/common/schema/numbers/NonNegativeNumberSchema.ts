import {z} from "zod";

/**
 * A Zod schema for validating a non-negative number.
 *
 * This schema enforces the following rules:
 * - **Must be a number**: Throws `"Must be a number."` if the value is not of type `number`.
 * - **Must be >= 0**: Throws `"Must be at least 0."` if the number is negative.
 *
 * @remarks
 * Useful for validating quantities, prices, counters, or any numeric field that should
 * not be negative.
 *
 * @example
 * ```ts
 * NonNegativeNumberSchema.parse(10);   // ✅ Passes
 * NonNegativeNumberSchema.parse(-5);   // ❌ Throws: "Must be at least 0."
 * NonNegativeNumberSchema.parse("10"); // ❌ Throws: "Must be a number."
 * ```
 */
export const NonNegativeNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});