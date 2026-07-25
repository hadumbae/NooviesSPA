/**
 * @fileoverview Defines query key constants for user administration data views.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query keys for fetching user details and administrative view data. */
export const UserAdminViewDataQueryKeys = buildQueryKey(
    ["users", "views", "admin"],
    {userDetails: ["item", "details"]},
);