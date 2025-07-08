import {z} from "zod";

/**
 * A schema that validates a number which is required to be:
 * - A number type (not string, not null, etc.)
 * - Greater than or equal to 0
 *
 * Fails with:
 * - `"Required."` if missing
 * - `"Must be a number."` if wrong type
 * - `"Must be at least 0."` if negative
 */
export const NonNegativeNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});

/**
 * A schema that coerces the input to a number before validation.
 * - Accepts strings (e.g., `"42"`) or numbers (e.g., `42`)
 * - Converts the input to a number before checking
 * - Must still be ≥ 0
 *
 * Fails with:
 * - `"Required."` if missing
 * - `"Must be a number."` if coercion fails
 * - `"Must be at least 0."` if negative
 */
export const CoercedNonNegativeNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});

/**
 * A schema that preprocesses the input:
 * - Treats `""`, `null`, and `undefined` as `undefined`
 * - Converts valid numeric strings (e.g., `"42"`) to numbers
 * - Rejects invalid numeric strings (e.g., `"abc"`)
 *
 * Then validates using `NonNegativeNumberSchema`.
 *
 * Useful when receiving loosely-typed form inputs.
 */
export const CleanedNonNegativeNumberSchema = z
    .preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) {
                return undefined;
            }

            const num = Number(val);
            return !Number.isNaN(num) ? num : undefined;
        },
        NonNegativeNumberSchema
    );