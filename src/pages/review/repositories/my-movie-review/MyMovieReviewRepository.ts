/**
 * @file API repository for current-user MovieReview endpoints.
 * MyMovieReviewRepository.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {
    CreateCurrentUserMovieReviewParams,
    CurrentUserMovieReviewsParams,
    UpdateCurrentUserMovieReviewParams
} from "@/pages/review/repositories/my-movie-review/MyMovieReviewRepository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/user/reviews`;

/**
 * Retrieves paginated MovieReviews created by the current user.
 */
export const getFetchMovieReviewsByCurrentUser = (
    {page, perPage, config}: CurrentUserMovieReviewsParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: "current/fetch",
        queries: {page, perPage, ...config},
    });

    return useFetchAPI({url, method: "GET"})
};

/**
 * Creates a MovieReview for the current user.
 */
export const postCreateMovieReviewForCurrentUser = (
    {data, config}: CreateCurrentUserMovieReviewParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: "current/create",
        queries: config
    });

    return useFetchAPI({url, method: "POST", data})
}

/**
 * Updates a MovieReview owned by the current user.
 */
export const patchUpdateMovieReviewForCurrentUser = (
    {reviewID, data, config}: UpdateCurrentUserMovieReviewParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `current/update/${reviewID}`,
        queries: config,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/**
 * Deletes a MovieReview owned by the current user.
 */
export const deleteRemoveMovieReviewForCurrentUser = (
    reviewID: ObjectId,
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `current/delete/${reviewID}`,
    });

    return useFetchAPI({url, method: "DELETE"});
}