/**
 * @file TanStack Query key definitions for Customer-related data views.
 * @filename queryKeys.ts
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized query keys for fetching aggregated customer and review data.
 * ---
 */
export const CustomerViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {
        /** Key for the comprehensive 360-degree customer profile overview. */
        profile: ["profile", "overview"],
        /** Key for the index/list of reviews authored by a specific customer. */
        reviews: ["profile", "reviews", "index"],
        /** Key for a singular, detailed movie review view. */
        review: ["profile", "reviews", "single"],
    },
);