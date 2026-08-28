import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {ObjectId} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms/ModerationMessageFormSchema";

/**
 * Configuration for the API request to clear engagement metrics.
 */
export type PatchResetReviewLikesConfig = {
    reviewID: ObjectId;
    data: ModerationMessageFormData;
};

/** Clears all helpful votes and likes from a specific movie review. */
export function patchResetReviewLikes<TData = unknown>(
    {reviewID, data}: PatchResetReviewLikesConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/likes`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}