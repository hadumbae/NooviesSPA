/**
 * @fileoverview Zod schemas for validating movie credit query parameters.
 * Provides a unified contract for filtering and sorting parameters at the API boundary.
 */

import {
    MovieCreditQueryMatchSortsSchema
} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryMatchSortsSchema.ts";
import {MovieCreditQueryFiltersSchema} from "@/domains/moviecredit/schemas/query-options/MovieCreditQueryFiltersSchema.ts";
import {z} from "zod";

/**
 * Combined schema for MovieCredit list and search endpoints.
 */
export const MovieCreditQueryOptionsSchema = MovieCreditQueryFiltersSchema.merge(MovieCreditQueryMatchSortsSchema);

/**
 * Type-safe representation of movie credit query options.
 */
export type MovieCreditQueryOptions = z.infer<typeof MovieCreditQueryOptionsSchema>;