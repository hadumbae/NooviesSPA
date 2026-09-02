/**
 * @fileoverview Centralized React Query key factory for administrative page data fetching operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Query key hierarchy for administrative page data caching and invalidation. */
export const AdminPagesQueryKeys = buildQueryKey(
    ["pages", "admin"],
    {dashboard: ["dashboard"]},
);