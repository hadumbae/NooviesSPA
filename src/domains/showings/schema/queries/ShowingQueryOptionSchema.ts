import {ShowingQueryMatchFilterSchema} from "./ShowingQueryMatchFilterSchema";
import {ShowingQueryMatchSortSchema} from "./ShowingQueryMatchSortSchema";
import {ShowingQueryReferenceFilterSchema} from "./ShowingQueryReferenceFilterSchema";
import {z} from "zod";

/**
 * Unified query option schema for Showing endpoints.
 *
 * Combines:
 * - Match filters
 * - Sort options
 * - Reference-level filters
 */
export const ShowingQueryOptionSchema =
    ShowingQueryMatchFilterSchema
        .merge(ShowingQueryMatchSortSchema)
        .merge(ShowingQueryReferenceFilterSchema);
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