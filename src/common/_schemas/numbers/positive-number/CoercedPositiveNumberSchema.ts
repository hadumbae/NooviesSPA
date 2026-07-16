/**
 * @fileoverview Zod schema for validating and coercing values into positive numbers.
 */

import {z} from "zod";

/** Zod schema that coerces input to a number and validates that it is positive. */
export const CoercedPositiveNumberSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a number."})
    .positive({message: "Must be a positive number."});

/** Type inferred from the coerced positive number schema. */
export type CoercedPositiveNumber = z.infer<typeof CoercedPositiveNumberSchema>;