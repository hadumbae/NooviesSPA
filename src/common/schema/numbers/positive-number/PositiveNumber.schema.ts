import {z} from "zod";

/**
 * Schema that validates a required positive number.
 * - Must be a number (otherwise shows "Must be a number.")
 * - Must be positive (greater than 0)
 * - Throws "Required." error if value is missing
 */
export const PositiveNumberSchema = z
    .number({ required_error: "Required.", invalid_type_error: "Must be a number." })
    .positive({ message: "Must be a positive number." });

/**
 * Schema that coerces the input to a number, then validates it as a required positive number.
 * - Coerces strings and other inputs to numbers before validation
 * - Must be positive (greater than 0)
 * - Throws "Required." error if value is missing
 * - Throws "Must be a number." if coercion fails
 */
export const CoercedPositiveNumberSchema = z
    .coerce
    .number({ required_error: "Required.", invalid_type_error: "Must be a number." })
    .positive({ message: "Must be a positive number." });

/**
 * Schema that preprocesses the input by attempting to convert it to a number.
 * - If conversion results in NaN, returns `undefined` to trigger "Required." error
 * - Otherwise, validates that the number is positive using {@link PositiveNumberSchema}
 */
export const CleanedPositiveNumberSchema = z.preprocess(
    (val) => {
        if (val === "" || val === null || val === undefined) {
            return undefined;
        }

        const num = Number(val);
        return !isNaN(num) ? num : undefined;
    },
    PositiveNumberSchema,
);

