/**
 * @fileoverview Zod schema for coercing input values into numbers.
 */

import {z} from "zod";

/** Zod schema that coerces input values into numbers with custom error messages. */
export const CoercedNumberValueSchema = z
    .coerce
    .number({required_error: "Required.", invalid_type_error: "Must be a valid number."});

/** Type representing a value coerced into a number. */
export type CoercedNumberValue = z.infer<typeof CoercedNumberValueSchema>;