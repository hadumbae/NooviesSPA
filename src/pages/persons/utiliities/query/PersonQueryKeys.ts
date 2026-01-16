/**
 * @file PersonQueryKeys.ts
 *
 * Centralized query key factory for `Person` resources.
 *
 * Provides stable, structured TanStack Query keys for:
 * - Single-entity queries (by ID or slug)
 * - List queries with filters
 * - Paginated list queries
 *
 * All keys are rooted under the `"persons"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Query key helpers for `Person` queries.
 */
export const PersonQueryKeys = {
    /**
     * Root query key for all person-related queries.
     */
    all: ["persons"] as const,

    /**
     * Query key for fetching a single person by ObjectId.
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...PersonQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single person by slug.
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...PersonQueryKeys.all, "slug", params] as const,

    /**
     * Query key for filtered, non-paginated person lists.
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...PersonQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for paginated person lists.
     */
    paginated: (params: QueryKeyByPaginationParams = {}) =>
        [...PersonQueryKeys.all, "lists", "paginated", params] as const,
};
