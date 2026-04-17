/**
 * @fileoverview Query key factory for the Person CRUD domain.
 * Provides a centralized, hierarchical registry of keys for TanStack Query
 * to manage caching, invalidation, and synchronization of administrative Person data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * A structured collection of query keys for Person administrative operations.
 */
export const PersonCRUDQueryKeys = buildQueryKey(
    ["persons", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    }
);