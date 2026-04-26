/**
 * @fileoverview Query key factory for the administrative theatre screen view data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized query keys for fetching administrative theatre screen view data.
 */
export const TheatreScreenAdminViewDataQueryKeys = buildQueryKey(
    ["theatre-screens", "views", "admin"],
    {details: ["details"]},
);