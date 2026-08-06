/**
 * @fileoverview Defines React Query mutation keys for user status management operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key factory object for user status management mutations. */
export const ManageUserStatusMutationKeys = buildQueryKey(
    ["users", "status"],
    {
        update: ["update"],
    },
);