/**
 * @fileoverview Query keys for Genre mutations.
 */

import {buildQueryKey} from "@/common/_feat";

/**
 * Standardized keys for Genre mutation invalidation and tracking.
 */
export const GenreCRUDMutationKeys = buildQueryKey(
    ["genres", "crud"],
    {
        submit: ["submit"],
        destroy: ["destroy"],
    }
);