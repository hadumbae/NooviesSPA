/**
 * @fileoverview Combined filter schema for MovieCredit queries.
 * This schema merges match-level (direct properties) and reference-level (relational IDs)
 * filters to provide a unified interface for credit filtering logic.
 */

import {
    MovieCreditQueryMatchFiltersSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryMatchFiltersSchema.ts";
import {
    MovieCreditQueryReferenceFiltersSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryReferenceFiltersSchema.ts";
import {z} from "zod";

/**
 * Combined filter schema for MovieCredit queries.
 */
export const MovieCreditQueryFiltersSchema =
    MovieCreditQueryMatchFiltersSchema.merge(MovieCreditQueryReferenceFiltersSchema);

/**
 * Validated filter parameters for movie credit queries.
 */
export type MovieCreditQueryFilters =
    z.infer<typeof MovieCreditQueryFiltersSchema>;