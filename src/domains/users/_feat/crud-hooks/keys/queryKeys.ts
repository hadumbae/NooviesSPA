/**
 * @fileoverview Defines the query key factory for user CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key factory for user-related data fetching and caching. */
export const UserCRUDQueryKeys = buildQueryKey(
    ["genres", "crud"],
    {
        _id: ["_id"],
        list: ["list"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
    }
);
