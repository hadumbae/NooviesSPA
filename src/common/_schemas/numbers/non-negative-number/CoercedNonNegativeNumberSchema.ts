/**
 * @fileoverview Zod schema for validating and coercing non-negative numbers.
 */

import {z} from "zod";

/** Zod schema that coerces input to a number and ensures it is non-negative. */
export const CoercedNonNegativeNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must Not Be Negative"});

/** Type inferred from the CoercedNonNegativeNumberSchema. */
export type CoercedNonNegativeNumber = z.infer<typeof CoercedNonNegativeNumberSchema>;