/**
 * @fileoverview Zod schema for validating a single pagination value.
 */

import {z} from "zod";
import {preprocessToNumber} from "@/common/_feat/validation-preprocessors";
import {PositiveIntegerSchema} from "@/common/_schemas";

/** Zod schema for a pagination value object. */
export const PaginationValueSchema = z.object({
    value: preprocessToNumber(PositiveIntegerSchema),
});

/** Type representing a validated pagination value. */
export type PaginationValue = z.infer<typeof PaginationValueSchema>;