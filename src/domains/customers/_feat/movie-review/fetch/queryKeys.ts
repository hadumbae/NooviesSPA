/**
 * @fileoverview Defines TanStack Query keys for customer and movie review data views.
 */

import {buildQueryKey} from "@/common/_feat"

/** Query keys for fetching aggregated customer and review data views. */
export const CustomerReviewViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {review: ["profile", "reviews", "single"]}
)