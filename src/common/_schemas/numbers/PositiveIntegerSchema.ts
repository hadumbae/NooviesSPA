/**
 * @fileoverview Defines a Zod schema for validating positive integer values.
 */

import {NumberValueSchema} from "@/common/schema/numbers/number-value/NumberValueSchema.ts";
import {z} from "zod";

/** Zod schema that validates a number is both an integer and positive. */
export const PositiveIntegerSchema = NumberValueSchema
    .int({message: "Must Be An Integer."})
    .positive({message: "Must Be Positive."});

/** Type inferred from the PositiveIntegerSchema. */
export type PositiveInteger = z.infer<typeof PositiveIntegerSchema>;