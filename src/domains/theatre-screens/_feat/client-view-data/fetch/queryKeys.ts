/**
 * @fileoverview Query keys for the client-facing theatre screens view data.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query keys for the client-facing theatre screens view data. */
export const TheatreScreenClientViewQueryKeys = buildQueryKey(
    ["theatre-screens", "views", "client"],
    {withShowings: ["with-showings"]}
);