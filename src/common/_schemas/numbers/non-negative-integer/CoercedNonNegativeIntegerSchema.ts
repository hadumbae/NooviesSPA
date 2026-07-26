/**
 * @fileoverview Zod schema for validating and coercing values into non-negative integers.
 */

import {z} from "zod";
import {CoercedNumberValueSchema} from "@/common/_schemas/numbers/number-value/CoercedNumberValueSchema.ts";

/** Zod schema that coerces input to a number and validates it is a non-negative integer. */
export const CoercedNonNegativeIntegerSchema = CoercedNumberValueSchema
    .int({message: "Must Be An Integer."})
    .nonnegative({message: "Must Be Non-Negative."});

/** Type inferred from the CoercedNonNegativeIntegerSchema. */
export type CoercedNonNegativeInteger = z.infer<typeof CoercedNonNegativeIntegerSchema>;