/**
 * @fileoverview Query key factory for Theatre Screen CRUD operations.
 * Provides a consistent naming convention for React Query caching.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Unique query keys for Theatre Screen data fetching.
 */
export const TheatreScreenCRUDQueryKeys = buildQueryKey(
    ["theatre-screens", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
        query: ["list", "query"],
        queryPaginated: ["list", "query", "paginated"],
    }
);