/**
 * @fileoverview Defines a Zod schema for validating positive integer values.
 */

import {z} from "zod";
import {CoercedNumberValueSchema} from "@/common/_schemas/numbers/number-value";

export const CoercedPositiveIntegerSchema = CoercedNumberValueSchema
    .int({message: "Must Be An Integer."})
    .positive({message: "Must Be Positive."});

export type CoercedPositiveInteger = z.infer<typeof CoercedPositiveIntegerSchema>;