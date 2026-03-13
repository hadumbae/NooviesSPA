/**
 * @file MovieQueryKeys.ts
 *
 * Centralized TanStack Query key factory for `Movie` resources.
 *
 * Provides stable, namespaced query keys for:
 * - Single-movie queries (by ID or slug)
 * - Filtered movie lists
 * - Paginated movie collections
 *
 * All keys are rooted under the `"movies"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Query key factory for `Movie` queries.
 */
export const MovieQueryKeys = {
    /**
     * Root key for all movie-related queries.
     */
    all: ["movies"] as const,

    /**
     * Query key for fetching a single movie by ObjectId.
     *
     * @param params - ID-based query parameters
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...MovieQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single movie by slug.
     *
     * @param params - Slug-based query parameters
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...MovieQueryKeys.all, "slug", params] as const,

    /**
     * Query key for fetching filtered movie lists.
     *
     * @param params - Arbitrary query and request options
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...MovieQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for fetching paginated movie lists.
     *
     * @param params - Pagination, filters, and request options
     */
    paginated: (params: QueryKeyByPaginationParams = {}) =>
        [...MovieQueryKeys.all, "lists", "paginated", params] as const,
};
