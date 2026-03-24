/**
 * @file Zod validation schema and type definitions for individual pagination values.
 * @filename PaginationValueSchema.ts
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating a single, standalone pagination number.
 */
export const PaginationValueSchema = z.object({
    /** A cleaned, positive integer representing a pagination metric. */
    value: CleanedPositiveNumberSchema,
});

/**
 * Inferred TypeScript type representing a single validated pagination value.
 */
export type PaginationValue = z.infer<typeof PaginationValueSchema>;