/**
 * @file ShowingQueryKeys.ts
 *
 * Centralized React Query keys for `Showing`-related queries.
 * Used to ensure consistent cache keys across repositories and hooks.
 */

/**
 * Query keys for fetching a single `Showing`.
 *
 * - By internal ID
 * - By public slug
 */
export const ShowingIDQueryKeys = [
    "fetch_showing_by_id",
    "fetch_showing_by_slug",
] as const;

/**
 * Query keys for fetching lists of `Showing` entities.
 *
 * - Non-paginated query results
 * - Paginated query results
 */
export const ShowingListQueryKeys = [
    "fetch_showings_by_query",
    "fetch_paginated_showings_by_query",
] as const;
