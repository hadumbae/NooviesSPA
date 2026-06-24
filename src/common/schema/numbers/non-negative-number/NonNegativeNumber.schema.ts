/**
 * @fileoverview Zod schemas for validating and processing non-negative numbers.
 */

import {z} from "zod";

/** Validates that a value is a number type and greater than or equal to zero. */
export const NonNegativeNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});

/** Coerces input to a number and validates that it is greater than or equal to zero. */
export const CoercedNonNegativeNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must Not Be Negative"});

/**
 * Preprocesses empty or nullish values to undefined and converts numeric strings to numbers.
 * Validates the result against NonNegativeNumberSchema.
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