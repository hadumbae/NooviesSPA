/**
 * @fileoverview Mutation query key constants for administrative user role status changes.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key configuration object for managing admin privilege grant and revoke mutations. */
export const UpdateAdminStatusMutationKeys = buildQueryKey(
    ["users", "roles", "admin"],
    {update: ["update"]},
);