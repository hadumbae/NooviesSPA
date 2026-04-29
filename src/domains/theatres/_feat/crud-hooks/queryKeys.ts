/**
 * @fileoverview Query key factory for Theatre CRUD operations.
 * Provides a structured and centralized source of truth for TanStack Query keys,
 * ensuring consistent caching and invalidation across the Theatre domain.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Query keys for Theatre administrative operations.
 */
export const TheatreCRUDQueryKeys = buildQueryKey(
    ["theatres", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    },
);