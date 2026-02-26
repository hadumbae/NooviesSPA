/**
 * @file API accessors for current user movie reviews.
 * MyMovieReviewRepository.ts
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {
    CreateCurrentUserMovieReviewParams,
    CurrentUserMovieReviewsParams, UpdateCurrentUserMovieReviewParams
} from "@/pages/review/repositories/my-movie-review/MyMovieReviewRepository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/user/reviews`;

/**
 * Fetches paginated movie reviews created by the current user.
 */
export const getFetchMovieReviewsByCurrentUser = (
    {page, perPage, options}: CurrentUserMovieReviewsParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: "current/fetch",
        queries: {page, perPage, ...options},
    });

    return useFetchAPI({url, method: "GET"})
};

/**
 * Creates a new movie review for the current user.
 */
export const postCreateMovieReviewForCurrentUser = (
    {data, options}: CreateCurrentUserMovieReviewParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: "current/create",
        queries: options
    });

    return useFetchAPI({url, method: "POST", data})
}

/**
 * Updates an existing movie review for the current user.
 */
export const patchUpdateMovieReviewForCurrentUser = (
    {reviewID, data, options}: UpdateCurrentUserMovieReviewParams
) => {
    const url = buildQueryURL({
        baseURL,
        path: `current/update/${reviewID}`,
        queries: options,
    });

    return useFetchAPI({url, method: "PATCH", data});
}