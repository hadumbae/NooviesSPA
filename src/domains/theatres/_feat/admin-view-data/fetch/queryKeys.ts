/**
 * @fileoverview React Query key factory for the Theatre Admin View domain.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized query keys for fetching administrative theatre view data.
 */
export const TheatreAdminViewDataQueryKeys = buildQueryKey(
    ["theatres", "views", "admin"],
    {
        "details": ["details"],
        "showingList": ["showings", "list"],
    }
);