/**
 * @fileoverview Mutation keys for person profile image removal operations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized mutation keys for profile image deletion.
 */
export const PersonRemoveProfileImageMutationKeys = buildQueryKey(
    ["persons", "profile-image"],
    {remove: ["remove"]}
);