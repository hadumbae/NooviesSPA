/**
 * @fileoverview Query key factory for Theatre CRUD operations.
 *
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query keys for Theatre administrative operations. */
export const TheatreCRUDQueryKeys = buildQueryKey(
    ["theatres", "crud"],
    {
        _id: ["_id"],
        slug: ["slug"],
        list: ["list"],
        query: ["list", "query"],
        paginated: ["list", "paginated"],
        queryPaginated: ["list", "query", "paginated"],
    },
);