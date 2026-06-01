/**
 * @fileoverview Repository for executing administrative moderation actions on movie reviews.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    PatchResetReviewDisplayNameConfig,
    PatchResetReviewLikesConfig,
    PatchSetReviewRatingConfig,
    PatchToggleReviewPublicityConfig,
} from "@/domains/movieReviews/_feat/admin-actions/repositories/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movieReviews/_feat";

/** Sends a PATCH request to toggle a review's public visibility status. */
export function patchToggleReviewPublicity<TData = unknown>(
    {reviewID, data}: PatchToggleReviewPublicityConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `rev/${reviewID}/publicity`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Sends a PATCH request to update or reset a reviewer's display name. */
export function patchResetReviewDisplayName<TData = unknown>(
    {reviewID, data}: PatchResetReviewDisplayNameConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `rev/${reviewID}/display-name`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Sends a PATCH request to clear all helpful votes and likes from a specific review. */
export function patchResetReviewLikes<TData = unknown>(
    {reviewID, data}: PatchResetReviewLikesConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `rev/${reviewID}/likes`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Sends a PATCH request to manually override the numeric star rating of a review. */
export function patchSetReviewRating<TData = unknown>(
    {reviewID, data}: PatchSetReviewRatingConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `rev/${reviewID}/ratings`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}