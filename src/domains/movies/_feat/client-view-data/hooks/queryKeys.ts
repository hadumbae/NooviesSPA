/**
 * @fileoverview Defines query keys for movie client-side view data fetching.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Query keys for movie information views including overview, credits, and showings. */
export const MovieClientViewDataQueryKeys = buildQueryKey(
    ["movies", "views", "client"],
    {
        infoOverview: ["info", "overview"],
        infoReviews: ["info", "reviews"],
        infoCredits: ["info", "credits"],
        infoShowings: ["info", "showings"],
    }
);