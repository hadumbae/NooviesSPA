/**
 * @file ScreenQueryKeys.ts
 *
 * Centralized React Query key factory for `Screen`-related queries.
 *
 * Provides stable, type-safe query keys for:
 * - Single screen lookups (by ID or slug)
 * - Filtered list queries
 * - Paginated list queries
 *
 * Designed for partial key matching and predictable
 * cache invalidation.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * React Query key factory for screens.
 */
export const ScreenQueryKeys = {
    /**
     * Base key for all screen queries.
     */
    all: ["screens"] as const,

    /**
     * Query key for screen detail queries by ID.
     *
     * @param params Optional ID parameters
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...ScreenQueryKeys.all, "_id", params] as const,

    /**
     * Query key for screen detail queries by slug.
     *
     * @param params Optional slug parameters
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...ScreenQueryKeys.all, "slug", params] as const,

    /**
     * Query key for non-paginated screen list queries.
     *
     * @param params Filter and sort options
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...ScreenQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for paginated screen list queries.
     *
     * @param params Pagination options
     */
    paginated: (params: QueryKeyByPaginationParams = {}) =>
        [...ScreenQueryKeys.all, "lists", "paginated", params] as const,
};
