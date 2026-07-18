/**
 * @fileoverview Defines a Zod schema for validating positive integer values.
 */

import {z} from "zod";
import {NumberValueSchema} from "@/common/_schemas/numbers/number-value/NumberValueSchema.ts";

/** Zod schema that validates a number is both an integer and positive. */
export const PositiveIntegerSchema = NumberValueSchema
    .int({message: "Must Be An Integer."})
    .positive({message: "Must Be Positive."});

/** Type inferred from the PositiveIntegerSchema. */
export type PositiveInteger = z.infer<typeof PositiveIntegerSchema>;