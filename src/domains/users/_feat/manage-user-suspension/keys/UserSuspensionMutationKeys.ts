/**
 * @fileoverview Mutation query key constants for user suspension operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key configuration object for managing user account suspension and unsuspension mutations. */
export const ManageUserSuspensionMutationKeys = buildQueryKey(
    ["users", "suspension"],
    {
        suspend: ["suspend"],
        unsuspend: ["unsuspend"],
    }
)