/**
 * @file MovieCreditQueryOptions.types.ts
 * @summary
 * TypeScript types inferred from movie credit query Zod schemas.
 *
 * @description
 * Exposes strongly typed query parameter contracts by inferring
 * TypeScript types directly from their source Zod schemas.
 *
 * This ensures:
 * - A single source of truth for query shape and constraints
 * - Compile-time safety aligned with runtime validation
 * - Clear separation between match, reference, and sort concerns
 *
 * These types are intended for use across controller, service,
 * and query-construction layers.
 */

import {z} from "zod";
import {
    MovieCreditQueryMatchFiltersSchema,
    MovieCreditQueryMatchSortsSchema,
    MovieCreditQueryReferenceFiltersSchema,
    MovieCreditQueryFiltersSchema,
    MovieCreditQueryOptionsSchema,
} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.schema.ts";

/**
 * Match-level filter parameters for querying movie credits.
 *
 * @remarks
 * Maps directly to fields on the MovieCredit document and is typically
 * translated into MongoDB `$match` stages.
 *
 * Derived from {@link MovieCreditQueryMatchFiltersSchema}.
 */
export type MovieCreditQueryMatchFilters =
    z.infer<typeof MovieCreditQueryMatchFiltersSchema>;

/**
 * Sorting parameters for movie credit queries.
 *
 * @remarks
 * Each property represents a sortable field and uses MongoDB-style
 * ordering semantics (`asc` | `desc`).
 *
 * Derived from {@link MovieCreditQueryMatchSortsSchema}.
 */
export type MovieCreditQueryMatchSorts =
    z.infer<typeof MovieCreditQueryMatchSortsSchema>;

/**
 * Reference-level filter parameters for movie credit queries.
 *
 * @remarks
 * Applies to fields resolved through lookups or joins
 * (e.g. movie slug, role name).
 *
 * Derived from {@link MovieCreditQueryReferenceFiltersSchema}.
 */
export type MovieCreditQueryReferenceFilters =
    z.infer<typeof MovieCreditQueryReferenceFiltersSchema>;

/**
 * Combined filter parameters for movie credit queries.
 *
 * @remarks
 * Merges match-level and reference-level filters into a single type
 * for convenience when constructing query pipelines.
 *
 * Derived from {@link MovieCreditQueryFiltersSchema}.
 */
export type MovieCreditQueryFilters =
    z.infer<typeof MovieCreditQueryFiltersSchema>;

/**
 * Full set of query options for movie credit list/search endpoints.
 *
 * @remarks
 * Combines filtering and sorting parameters into a single
 * type-safe contract aligned with API validation.
 *
 * Derived from {@link MovieCreditQueryOptionsSchema}.
 */
export type MovieCreditQueryOptions =
    z.infer<typeof MovieCreditQueryOptionsSchema>;
