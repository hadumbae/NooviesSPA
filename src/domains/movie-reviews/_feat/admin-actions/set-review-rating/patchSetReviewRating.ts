import {ObjectId} from "@/common/_schemas";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL";
import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {
    SetReviewRatingFormData
} from "@/domains/movie-reviews/_feat/admin-actions/set-review-rating/SetReviewRatingFormSchema.ts";

/**
 * Configuration for the API request to manually override a review's rating.
 */
export type PatchSetReviewRatingConfig = {
    reviewID: ObjectId;
    data: SetReviewRatingFormData;
};

/** Manually overrides the numeric star rating of a specific movie review. */
export function patchSetReviewRating<TData = unknown>(
    {reviewID, data}: PatchSetReviewRatingConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/ratings`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}