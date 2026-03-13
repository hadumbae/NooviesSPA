/**
 * @file GenreQueryKeys.ts
 *
 * Centralized TanStack Query key factory for `Genre` resources.
 *
 * Provides stable, namespaced query keys for:
 * - Single-genre queries (by ID or slug)
 * - Filtered genre lists
 * - Paginated genre collections
 *
 * All keys are rooted under the `"genres"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Query key factory for `Genre` queries.
 */
export const GenreQueryKeys = {
    /**
     * Root key for all genre-related queries.
     */
    all: ["genres"] as const,

    /**
     * Query key for fetching a single genre by ObjectId.
     *
     * @param params - ID-based query parameters
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...GenreQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single genre by slug.
     *
     * @param params - Slug-based query parameters
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...GenreQueryKeys.all, "slug", params] as const,

    /**
     * Query key for fetching filtered genre lists.
     *
     * @param params - Arbitrary query and request options
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...GenreQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for fetching paginated genre lists.
     *
     * @param params - Pagination, filters, and request options
     */
    paginated: (params: QueryKeyByPaginationParams = {}) =>
        [...GenreQueryKeys.all, "lists", "paginated", params] as const,
};
