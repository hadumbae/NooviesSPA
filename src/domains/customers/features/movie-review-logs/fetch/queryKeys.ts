/**
 * @fileoverview Defines the query keys for the customer review moderation logs.
 * These keys are used by TanStack Query for caching and cache invalidation.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts"

/**
 * Query key factory for customer review logs, categorized under customer views.
 */
export const CustomerReviewLogsQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reviewLogs: ["profile", "reviews", "single", "logs"]}
)