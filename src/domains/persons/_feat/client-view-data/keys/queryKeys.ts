/**
 * @fileoverview Defines query keys for person-related client view data fetching.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query key factory for person client view data. */
export const PersonClientViewQueryKeys = buildQueryKey(
    ["persons", "views", "client"],
    {
        info: ["info"],
    },
);