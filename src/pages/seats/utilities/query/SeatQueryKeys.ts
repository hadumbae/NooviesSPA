/**
 * @file seatQueryKeys.ts
 *
 * Centralized React Query key factory for `seat`-related queries.
 *
 * Provides stable, type-safe query keys for:
 * - Single seat lookups (by ID or slug)
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
 * React Query key factory for seats.
 */
export const SeatQueryKeys = {
    /**
     * Base key for all seat queries.
     */
    all: ["seats"] as const,

    /**
     * Query key for seat detail queries by ID.
     *
     * @param params Optional ID parameters
     */
    ids: (params?: QueryKeyByIDParams) =>
        [...SeatQueryKeys.all, "_id", params] as const,

    /**
     * Query key for seat detail queries by slug.
     *
     * @param params Optional slug parameters
     */
    slugs: (params?: QueryKeyBySlugParams) =>
        [...SeatQueryKeys.all, "slug", params] as const,

    /**
     * Query key for non-paginated seat list queries.
     *
     * @param params Filter and sort options
     */
    query: (params?: QueryKeyByOptionsParams) =>
        [...SeatQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for paginated seat list queries.
     *
     * @param params Pagination options
     */
    paginated: (params?: QueryKeyByPaginationParams) =>
        [...SeatQueryKeys.all, "lists", "paginated", params] as const,
};
