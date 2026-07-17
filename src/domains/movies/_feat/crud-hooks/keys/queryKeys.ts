/**
 * @fileoverview Defines the query key factory for movie CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key configuration for movie-related data fetching and caching. */
export const MovieCRUDQueryKeys = buildQueryKey(
    ["movies", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        list: ["list"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
        query: ["list", "query"],
        queryPaginated: ["list", "query", "paginated"],
    },
);