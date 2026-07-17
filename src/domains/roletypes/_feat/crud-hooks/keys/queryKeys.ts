/**
 * @fileoverview Defines the query key factory for RoleType CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key configuration for RoleType CRUD hooks. */
export const RoleTypeCRUDQueryKeys = buildQueryKey(
    ["role_types", "crud"],
    {
        _id: ["_id"],
        list: ["list"],
        find: ["list", "find"],
        paginated: ["list", "paginated"],
    },
)