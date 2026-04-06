/**
 * @file Query key definitions for administrative movie review mutations.
 * @filename CustomerReviewActionMutationKeys.ts
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/**
 * Standardized TanStack Query (React Query) keys for review moderation actions.
 * ---
 */
export const CustomerReviewActionMutationKeys = buildQueryKey(
    ["customer", "reviews"],
    {
        /** Key for visibility toggle mutations */
        publicity: ["publicity"],
        /** Key for display name reset/correction mutations */
        displayName: ["displayName"],
        /** Key for clearing helpful likes/engagement metrics */
        likes: ["likes"],
        /** Key for manual star-rating overrides */
        rating: ["rating"],
    }
);