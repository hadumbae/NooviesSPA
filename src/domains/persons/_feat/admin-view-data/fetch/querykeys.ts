/**
 * @fileoverview Query keys for the administrative person detail view.
 */

import {buildQueryKey} from "@/common/_feat";

/**
 * Standardized query keys for administrative view data.
 */
export const PersonAdminViewQueryKeys = buildQueryKey(
    ["movie_credits", "views", "admin"],
    {details: ["person", "details"]},
);