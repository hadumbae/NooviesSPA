/**
 * @fileoverview Defines the query keys for the customer review moderation logs.
 *
 */

import {buildQueryKey} from "@/common/_feat"

/** Query key factory for customer review logs. */
export const CustomerReviewLogsQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reviewLogs: ["profile", "reviews", "single", "logs"]}
)