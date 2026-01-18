/**
 * @file ShowingQueryKeys.ts
 *
 * Centralized TanStack Query key factory for `Showing` resources.
 *
 * Provides stable, namespaced query keys for:
 * - Single-showing queries (by ID or slug)
 * - Filtered showing lists
 * - Paginated showing collections
 *
 * All keys are rooted under the `"showings"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Query key factory for `Showing` queries.
 */
export const ShowingQueryKeys = {
    /**
     * Root key for all showing-related queries.
     */
    all: ["showings"] as const,

    /**
     * Query key for fetching a single showing by ObjectId.
     *
     * @param params - ID-based query parameters
     */
    ids: (params?: QueryKeyByIDParams) =>
        [...ShowingQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single showing by slug.
     *
     * @param params - Slug-based query parameters
     */
    slugs: (params?: QueryKeyBySlugParams) =>
        [...ShowingQueryKeys.all, "slug", params] as const,

    /**
     * Query key for fetching filtered showing lists.
     *
     * @param params - Arbitrary query and request options
     */
    query: (params?: QueryKeyByOptionsParams) =>
        [...ShowingQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for fetching paginated showing lists.
     *
     * @param params - Pagination, filters, and request options
     */
    paginated: (params?: QueryKeyByPaginationParams) =>
        [...ShowingQueryKeys.all, "lists", "paginated", params] as const,
};
