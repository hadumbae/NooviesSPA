/**
 * @fileoverview Defines the TanStack Query keys for customer profile overview
 * views. These keys ensure consistent cache management for aggregated
 * customer profile data.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts"

/**
 * Standardized query keys for fetching aggregated customer profile overview
 * data, categorized under the customer views domain.
 */
export const CustomerProfileOverviewViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {profile: ["profile", "overview"]}
)