/**
 * @fileoverview Repository for executing administrative moderation actions on movie reviews.
 *
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    PatchResetReviewDisplayNameConfig,
    PatchResetReviewLikesConfig,
    PatchSetReviewRatingConfig,
    PatchToggleReviewPublicityConfig,
} from "@/domains/movie-reviews/_feat/admin-actions/repositories/repository.types.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat";

/** Toggles the public visibility status of a specific movie review. */
export function patchToggleReviewPublicity<TData = unknown>(
    {reviewID, data}: PatchToggleReviewPublicityConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/publicity`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Updates or resets the display name associated with a movie review. */
export function patchResetReviewDisplayName<TData = unknown>(
    {reviewID, data}: PatchResetReviewDisplayNameConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/display-name`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Clears all helpful votes and likes from a specific movie review. */
export function patchResetReviewLikes<TData = unknown>(
    {reviewID, data}: PatchResetReviewLikesConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/likes`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Manually overrides the numeric star rating of a specific movie review. */
export function patchSetReviewRating<TData = unknown>(
    {reviewID, data}: PatchSetReviewRatingConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/ratings`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}