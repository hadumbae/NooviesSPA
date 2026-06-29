/**
 * @fileoverview Defines the query key factory for genre CRUD operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key factory for genre-related data fetching and cache management. */
export const SeatMapCRUDQueryKeys = buildQueryKey(
    ["seat_maps", "crud"],
    {
        _id: ["_id"],
        list: ["list"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    }
);