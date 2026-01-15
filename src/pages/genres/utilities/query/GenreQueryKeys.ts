import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyBySlugParams
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Centralized query key factory for `Genre` resources.
 *
 * Provides stable, structured TanStack Query keys for:
 * - Single-entity queries (by ID or slug)
 * - Collection/list queries with filters and options
 *
 * All keys are rooted under the `"genres"` namespace.
 */
export const GenreQueryKeys = {
    /**
     * Root query key for all `Genre` queries.
     */
    all: ["genres"] as const,

    /**
     * Query key for fetching a single genre by ObjectId.
     */
    ids: (params?: QueryKeyByIDParams) =>
        [...GenreQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single genre by slug.
     */
    slugs: (params?: QueryKeyBySlugParams) =>
        [...GenreQueryKeys.all, "slug", params] as const,

    /**
     * Query key for fetching genre collections.
     *
     * Supports filters, pagination, and sorting options.
     */
    lists: (params?: QueryKeyByOptionsParams) =>
        [...GenreQueryKeys.all, "lists", params] as const,
};
