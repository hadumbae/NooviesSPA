/**
 * @file MovieCreditQueryKeys.ts
 *
 * Centralized TanStack Query key factory for `MovieCredit` resources.
 *
 * Provides stable, namespaced query keys for:
 * - Single credit queries (by ID or slug)
 * - Filtered credit lists
 * - Paginated credit collections
 * - Credits grouped by person
 *
 * All keys are rooted under the `"movie_credits"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
    QueryKeyBySlugParams,
} from "@/common/type/query/QueryKeyTypes.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for querying credits grouped by person.
 */
type QueryKeyByPersonParams = RequestOptions & {
    /** Optional person ObjectId */
    personID?: ObjectId;
};

/**
 * Query key factory for `MovieCredit` queries.
 */
export const MovieCreditQueryKeys = {
    /**
     * Root key for all movie credit queries.
     */
    all: ["movie_credits"] as const,

    /**
     * Query key for fetching a single credit by ObjectId.
     *
     * @param params - ID-based query parameters
     */
    ids: (params: QueryKeyByIDParams = {}) =>
        [...MovieCreditQueryKeys.all, "_id", params] as const,

    /**
     * Query key for fetching a single credit by slug.
     *
     * @param params - Slug-based query parameters
     */
    slugs: (params: QueryKeyBySlugParams = {}) =>
        [...MovieCreditQueryKeys.all, "slug", params] as const,

    /**
     * Query key for fetching filtered credit lists.
     *
     * @param params - Query filters and request options
     */
    query: (params: QueryKeyByOptionsParams = {}) =>
        [...MovieCreditQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for fetching paginated credit lists.
     *
     * @param params - Pagination, filters, and request options
     */
    paginated: (params: QueryKeyByPaginationParams = {}) =>
        [...MovieCreditQueryKeys.all, "lists", "paginated", params] as const,

    /**
     * Query key for fetching credits grouped by person.
     *
     * @param params - Person ID and request options
     */
    persons: (params: QueryKeyByPersonParams = {}) =>
        [...MovieCreditQueryKeys.all, "lists", "grouped", "person", params] as const,
};
