/**
 * @fileoverview Defines query keys for theatre client-side view data fetching.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key factory for theatre client views including browse lists and info. */
export const TheatreClientViewQueryKeys = buildQueryKey(
    ["theatres", "views", "client"],
    {
        browseList: ["browse", "list"],
        browseInfo: ["browse", "info"],
    },
);