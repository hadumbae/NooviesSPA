/**
 * @file TheatreQueryKeys.ts
 *
 * Centralized React Query key factory for all `Theatre`-related queries.
 *
 * Ensures consistent, type-safe cache keys for:
 * - Single-entity queries (by ID or slug)
 * - List queries
 * - Paginated queries
 *
 * Designed to work with React Query’s partial key matching
 * for precise cache invalidation.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Factory for all Theatre-related React Query keys.
 */
export const TheatreQueryKeys = {
    /**
     * Base key for all theatre queries.
     */
    all: ["theatres"],

    /**
     * Query key for fetching a theatre by ID.
     *
     * @param params Optional ID-based query parameters
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...TheatreQueryKeys.all, "_id", params],

    /**
     * Query key for fetching a theatre by slug.
     *
     * @param params Optional slug-based query parameters
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...TheatreQueryKeys.all, "slug", params],

    /**
     * Query key for non-paginated theatre list queries.
     *
     * @param params Filtering, sorting, or query options
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...TheatreQueryKeys.all, "lists", "query", params],

    /**
     * Query key for paginated theatre list queries.
     *
     * @param params Pagination, filtering, or sorting options
     */
    paginated: (params: QueryKeyByOptionsParams = {}) =>
        [...TheatreQueryKeys.all, "lists", "paginated", params],
};
