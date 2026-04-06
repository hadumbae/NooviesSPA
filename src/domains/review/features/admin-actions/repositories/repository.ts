/**
 * @file Repository for executing administrative moderation actions on movie reviews.
 * @filename repository.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    PatchResetReviewDisplayNameConfig,
    PatchResetReviewLikesConfig,
    PatchSetReviewRatingConfig,
    PatchToggleReviewPublicityConfig
} from "@/domains/review/features/admin-actions/repositories/repository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Base endpoint for administrative review moderation features.
 * Points to the specialized 'review-actions' feature controller.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/feat/review-actions`;

/**
 * Sends a PATCH request to toggle a review's 'isPublic' status.
 */
export const patchToggleReviewPublicity = async (
    {reviewID, data}: PatchToggleReviewPublicityConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `rev/${reviewID}/publicity`,
    });

    return useFetchAPI({url, method: "PATCH", data});
};

/**
 * Sends a PATCH request to update or reset a reviewer's display name.
 */
export const patchResetReviewDisplayName = async (
    {reviewID, data}: PatchResetReviewDisplayNameConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `rev/${reviewID}/display-name`,
    });

    return useFetchAPI({url, method: "PATCH", data});
};

/**
 * Sends a PATCH request to clear all 'helpful' votes/likes from a specific review.
 */
export const patchResetReviewLikes = async (
    {reviewID, data}: PatchResetReviewLikesConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `rev/${reviewID}/likes`,
    });

    return useFetchAPI({url, method: "PATCH", data});
};

/**
 * Sends a PATCH request to manually override the numeric star rating of a review.
 */
export const patchSetReviewRating = async (
    {reviewID, data}: PatchSetReviewRatingConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `rev/${reviewID}/ratings`,
    });

    return useFetchAPI({url, method: "PATCH", data});
};