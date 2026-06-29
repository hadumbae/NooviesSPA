/**
 * @fileoverview Query key definitions for administrative movie review mutations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized TanStack Query keys for review moderation actions.
 */
export const CustomerReviewActionMutationKeys = buildQueryKey(
    ["customer", "reviews"],
    {
        publicity: ["publicity"],
        displayName: ["displayName"],
        likes: ["likes"],
        rating: ["rating"],
    },
);