/**
 * @fileoverview Query key factory for Theatre Screen mutations.
 * Provides a consistent naming convention for mutation tracking and cache invalidation.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Unique mutation keys for Theatre Screen operations.
 */
export const TheatreScreenCRUDMutationKeys = buildQueryKey(
    ["theatre-screens", "mutations"],
    {submit: ["submit"], deleteSingle: ["delete", "single"]}
);