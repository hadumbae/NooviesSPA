/**
 * @fileoverview Defines TanStack Query keys for the showing administration view data.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query keys for fetching showing details and related administrative view data. */
export const ShowingAdminViewDataQueryKeys = buildQueryKey(
    ["showings", "views", "client"],
    {
        showingDetails: ["details"],
    }
);