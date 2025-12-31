import {
    ShowingQueryMatchFilterSchema,
    ShowingQueryMatchSortSchema,
    ShowingQueryOptionSchema,
    ShowingQueryReferenceFilterSchema,
} from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import { z } from "zod";

/**
 * Match-based filter criteria for querying Showings.
 *
 * @description
 * Inferred from {@link ShowingQueryMatchFilterSchema}.
 * All fields are optional, allowing partial and composable filtering
 * against direct Showing fields.
 *
 * @example
 * ```ts
 * const filters: ShowingQueryMatchFilters = {
 *   movie: "movieId123",
 *   theatre: "theatreId456",
 *   isActive: true,
 * };
 * ```
 */
export type ShowingQueryMatchFilters =
    z.infer<typeof ShowingQueryMatchFilterSchema>;

/**
 * Sort criteria for querying Showings.
 *
 * @description
 * Inferred from {@link ShowingQueryMatchSortSchema}.
 * Uses MongoDB sort semantics:
 * - `1` ascending
 * - `-1` descending
 *
 * @example
 * ```ts
 * const sort: ShowingQueryMatchSorts = {
 *   sortByStartTime: 1,
 *   sortByEndTime: -1,
 * };
 * ```
 */
export type ShowingQueryMatchSorts =
    z.infer<typeof ShowingQueryMatchSortSchema>;

/**
 * Reference-based filter criteria for querying Showings.
 *
 * @description
 * Inferred from {@link ShowingQueryReferenceFilterSchema}.
 * These filters apply to populated or joined documents
 * rather than direct Showing fields.
 */
export type ShowingQueryReferenceFilters =
    z.infer<typeof ShowingQueryReferenceFilterSchema>;

/**
 * Combined query options for fetching Showings.
 *
 * @description
 * Inferred from {@link ShowingQueryOptionSchema}.
 * Includes:
 * - Match-based filters
 * - Reference-based filters
 * - Sort options
 *
 * This type represents the full query surface accepted by
 * Showing query endpoints and repositories.
 *
 * @example
 * ```ts
 * const queryOptions: ShowingQueryOptions = {
 *   movie: "movieId123",
 *   isActive: true,
 *   sortByStartTime: 1,
 * };
 * ```
 */
export type ShowingQueryOptions =
    z.infer<typeof ShowingQueryOptionSchema>;
