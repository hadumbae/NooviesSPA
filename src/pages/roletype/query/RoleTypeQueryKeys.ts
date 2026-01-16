/**
 * @file RoleTypeQueryKeys.ts
 *
 * Centralized TanStack Query key factory for `RoleType` resources.
 *
 * Provides stable, structured query keys for:
 * - Single role type queries (by ID)
 * - Filtered role type lists
 * - Paginated role type collections
 *
 * All keys are rooted under the `"roleType"` namespace.
 */

import {
    QueryKeyByIDParams,
    QueryKeyByOptionsParams,
    QueryKeyByPaginationParams,
} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Query key factory for `RoleType` queries.
 */
export const RoleTypeQueryKeys = {
    /**
     * Root query key for all role type queries.
     */
    all: ["roleType"] as const,

    /**
     * Query key for fetching a single role type by ID.
     *
     * @param params - ID-based query parameters
     */
    ids: (params?: QueryKeyByIDParams) =>
        [...RoleTypeQueryKeys.all, "id", params] as const,

    /**
     * Query key for fetching filtered role type lists.
     *
     * @param params - Arbitrary query and request options
     */
    query: (params?: QueryKeyByOptionsParams) =>
        [...RoleTypeQueryKeys.all, "lists", "query", params] as const,

    /**
     * Query key for fetching paginated role type lists.
     *
     * @param params - Pagination, filters, and request options
     */
    paginated: (params?: QueryKeyByPaginationParams) =>
        [...RoleTypeQueryKeys.all, "lists", "paginated", params] as const,
};
