/**
 * @fileoverview Mutation keys for user CRUD operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for user management actions like deletion. */
export const UserCRUDMutationKeys = buildQueryKey(
    ["users", "crud"],
    {destroy: ["destroy"]},
);