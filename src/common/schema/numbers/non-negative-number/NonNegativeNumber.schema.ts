import {z} from "zod";

/**
 * Zod schema for validating a non-negative number.
 *
 * This schema:
 * - Requires the value to be a number.
 * - Ensures the value is 0 or greater.
 *
 * Validation errors:
 * - `"Required."` if the value is `undefined` or missing.
 * - `"Must be a number."` if the value is not a number.
 * - `"Must be at least 0."` if the value is negative.
 */
export const NonNegativeNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});

/**
 * Zod schema for validating a required non-negative number.
 *
 * This schema:
 * - Accepts only actual number values (no coercion from strings).
 * - Rejects `undefined`, `null`, or any non-number types.
 * - Ensures the number is greater than or equal to 0.
 *
 * Validation messages:
 * - `"Required."` if the value is `undefined`.
 * - `"Must be a number."` if the value is not a number.
 * - `"Must be at least 0."` if the number is negative.
 */
export const CleanedNonNegativeNumberSchema = z
    .preprocess(
        (val) => {
            const num = Number(val);
            return !Number.isNaN(num) ? num : undefined;
        },
        NonNegativeNumberSchema
    );

