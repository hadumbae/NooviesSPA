/**
 * @fileoverview Zod schema and type definition for validating non-negative numbers.
 */

import {z} from "zod";

/** Zod schema that validates a number is greater than or equal to zero. */
export const NonNegativeNumberSchema = z
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .nonnegative({message: "Must be at least 0."});

/** Type inferred from the non-negative number schema. */
export type NonNegativeNumber = z.infer<typeof NonNegativeNumberSchema>;