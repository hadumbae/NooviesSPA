/**
 * @fileoverview Defines the TanStack Query keys for customer movie review
 * views. These keys facilitate consistent cache management for paginated
 * review lists.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts"

/**
 * Standardized query keys for fetching aggregated customer movie review data,
 * categorized under the customer views domain.
 */
export const CustomerReviewsViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reviews: ["profile", "reviews", "index"]}
)