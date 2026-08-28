import {ObjectId} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms/ModerationMessageFormSchema";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {MovieReviewAdminActionsBaseURL} from "@/domains/movie-reviews/_feat/admin-actions/baseURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";

/**
 * Configuration for the API request to toggle a review's visibility.
 */
export type PatchToggleReviewPublicityConfig = {
    reviewID: ObjectId;
    data: ModerationMessageFormData;
};

/** Toggles the public visibility status of a specific movie review. */
export function patchToggleReviewPublicity<TData = unknown>(
    {reviewID, data}: PatchToggleReviewPublicityConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: MovieReviewAdminActionsBaseURL,
        path: `/rev/${reviewID}/publicity`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}