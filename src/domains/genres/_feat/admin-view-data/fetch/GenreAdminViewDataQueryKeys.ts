/**
 * @fileoverview Query key factory for administrative Genre view-specific data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Standardized query keys for the Genre administration module. */
export const GenreAdminViewDataQueryKeys = buildQueryKey(
    ["genres", "views", "admin"],
    {itemDetails: ["item", "details"]},
);