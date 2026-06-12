/**
 * @fileoverview Mutation keys for user password update operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation key factory for password updates. */
export const UpdatePasswordMutationKeys = buildQueryKey(
    ["user", "profile", "password"],
    {updatePassword: ["update"]}
);