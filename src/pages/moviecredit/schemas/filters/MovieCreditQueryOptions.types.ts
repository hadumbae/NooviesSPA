import { z } from "zod";
import {
    MovieCreditQueryFiltersSchema,
    MovieCreditQueryOptionsSchema,
    MovieCreditQuerySortsSchema
} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.schema.ts";

/**
 * Type representing the filter parameters for querying movie credits.
 *
 * Derived from `MovieCreditQueryFiltersSchema`.
 */
export type MovieCreditQueryFilters = z.infer<typeof MovieCreditQueryFiltersSchema>;

/**
 * Type representing the sorting options for movie credit queries.
 *
 * Derived from `MovieCreditQuerySortsSchema`.
 */
export type MovieCreditQuerySorts = z.infer<typeof MovieCreditQuerySortsSchema>;

/**
 * Type representing the full query options for movie credits,
 * including both filters and sorting.
 *
 * Derived from `MovieCreditQueryOptionsSchema`.
 */
export type MovieCreditQueryOptions = z.infer<typeof MovieCreditQueryOptionsSchema>;
