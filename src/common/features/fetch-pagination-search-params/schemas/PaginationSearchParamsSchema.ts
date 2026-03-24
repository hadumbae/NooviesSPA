/**
 * @file Zod validation schema and type definitions for optional pagination URL search parameters.
 * @filename PaginationSearchParamSchema.ts
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema for validating and coercing pagination-related query parameters.
 */
export const PaginationSearchParamsSchema = z.object({
    /** The current results page index. */
    page: CleanedPositiveNumberSchema.optional(),
    /** The number of items to display per page. */
    perPage: CleanedPositiveNumberSchema.optional(),
});

/**
 * TypeScript type representing validated pagination search parameters.
 */
export type PaginationSearchParams = z.infer<typeof PaginationSearchParamsSchema>;