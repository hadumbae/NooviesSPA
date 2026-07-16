/**
 * @fileoverview Zod schema and type definition for ticket price validation with empty string preprocessing.
 */

import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {z} from "zod";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/**
 * Zod schema for validating ticket price, transforming empty strings to undefined.
 */
export const TicketPriceSchema = preprocessEmptyStringToUndefined(
    NonNegativeNumberSchema,
);

/**
 * Inferred type for ticket price.
 */
export type TicketPrice = z.infer<typeof TicketPriceSchema>;