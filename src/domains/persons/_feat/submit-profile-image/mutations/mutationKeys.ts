/**
 * @fileoverview Mutation keys for person profile image upload operations.
 */

import {buildQueryKey} from "@/common/_feat";

/**
 * Standardized mutation keys for profile image uploads.
 */
export const PersonProfileImageMutationKeys = buildQueryKey(
    ["persons", "profile-image"],
    {upload: ["upload"]},
);