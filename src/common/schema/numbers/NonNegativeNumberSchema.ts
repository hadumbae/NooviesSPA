import {z} from "zod";

/**
 * Zod schema that parses a value into a number and ensures it is non-negative (i.e., ≥ 0).
 *
 * - Coerces the input to a number (e.g., from a string like `"42"`).
 * - Fails with `"Required."` if the value is `undefined` or missing.
 * - Fails with `"Must be a number."` if coercion fails (e.g., non-numeric string).
 * - Fails with `"Must be at least 0."` if the number is negative.
 *
 * @example
 * NonNegativeNumberSchema.parse("5"); // → 5
 * NonNegativeNumberSchema.parse(-1);  // → throws ZodError
 */
export const NonNegativeNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});