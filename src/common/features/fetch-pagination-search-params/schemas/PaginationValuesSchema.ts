/**
 * @file Zod validation schema and type definitions for a complete pagination state.
 * @filename PaginationValuesSchema.ts
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating a complete set of pagination parameters.
 */
export const PaginationValuesSchema = z.object({
    /** The 1-based index of the current results page. */
    page: CleanedPositiveNumberSchema,

    /** The maximum number of items to be returned in a single result set. */
    perPage: CleanedPositiveNumberSchema,
});

/**
 * Inferred TypeScript type representing a validated pagination configuration.
 */
export type PaginationValues = z.infer<typeof PaginationValuesSchema>;