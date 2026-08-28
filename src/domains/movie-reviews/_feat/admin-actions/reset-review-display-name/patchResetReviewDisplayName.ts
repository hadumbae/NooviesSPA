import {ObjectId} from "@/common/_schemas";
import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL.ts";
import {
    ResetReviewDisplayNameFormData
} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-display-name/ResetReviewDisplayNameFormSchema.ts";

/**
 * Configuration for the API request to update a reviewer's display name.
 */
export type PatchResetReviewDisplayNameConfig = {
    reviewID: ObjectId;
    data: ResetReviewDisplayNameFormData;
};

/** Updates or resets the display name associated with a movie review. */
export function patchResetReviewDisplayName<TData = unknown>(
    {reviewID, data}: PatchResetReviewDisplayNameConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/display-name`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}