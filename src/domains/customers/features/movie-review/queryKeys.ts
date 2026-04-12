/**
 * @fileoverview Defines the TanStack Query keys for customer-related data views.
 * These keys are used for caching and invalidating aggregated customer and
 * movie review data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts"

/**
 * Standardized query keys for fetching aggregated customer and review data,
 * categorized under the customer views domain.
 */
export const CustomerReviewViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {review: ["profile", "reviews", "single"]}
)