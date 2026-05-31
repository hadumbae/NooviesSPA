/**
 * @fileoverview API repository for managing movie reviews belonging to the current user.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {ManageMyReviewsBaseURL} from "@/domains/review/_feat/my-reviews/repository/baseURL.ts";
import type {
    CreateCurrentUserMovieReviewConfig,
    CurrentUserMovieReviewsConfig,
    UpdateCurrentUserMovieReviewConfig
} from "@/domains/review/_feat/my-reviews/repository/repository.types.ts";

/** Retrieves paginated movie reviews created by the authenticated user. */
export function getFetchMovieReviewsByCurrentUser<TData = unknown>(
    {page, perPage, config}: CurrentUserMovieReviewsConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: "/current/fetch",
        queries: {page, perPage, ...config},
    });

    return useFetchAPI({url, method: "GET"})
}

/** Creates a new movie review for the authenticated user. */
export function postCreateMovieReviewForCurrentUser<TData = unknown>(
    {data, config}: CreateCurrentUserMovieReviewConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: "/current/create",
        queries: config
    });

    return useFetchAPI({url, method: "POST", data})
}

/** Updates an existing movie review owned by the authenticated user. */
export function patchUpdateMovieReviewForCurrentUser<TData = unknown>(
    {reviewID, data, config}: UpdateCurrentUserMovieReviewConfig
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: `/current/update/${reviewID}`,
        queries: config,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/** Deletes a specific movie review owned by the authenticated user. */
export function deleteRemoveMovieReviewForCurrentUser<TData = unknown>(
    reviewID: ObjectId,
): Promise<RequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: `/current/delete/${reviewID}`,
    });

    return useFetchAPI({url, method: "DELETE"});
}