/**
 * @fileoverview Defines the query key factory for genre CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key factory for genre-related data fetching and cache management. */
export const GenreCRUDQueryKeys = buildQueryKey(
    ["genres", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        list: ["list"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    }
);