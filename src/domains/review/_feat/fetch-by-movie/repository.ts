/**
 * @file Movie review browse request builders.
 * ReviewsByMovieRepository.ts
 */

import {
    FetchPaginatedReviewsByMovieParams,
    FetchReviewsByMovieParams
} from "src/domains/review/_feat/fetch-by-movie/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/features/fetch-api";
import {ReviewsByMovieBaseURL} from "@/domains/review/_feat/fetch-by-movie/baseURL.ts";

/**
 * Requests paginated reviews for a movie.
 */
export const getFetchReviewsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieParams
): Promise<RequestReturns<unknown>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews`,
        queries: {page, perPage, ...config},
    });

    return useFetchAPI({url, method: "GET"});
};

/**
 * Requests paginated reviews with aggregate details for a movie.
 */
export const getFetchReviewDetailsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieParams
): Promise<RequestReturns<unknown>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews/details`,
        queries: {page, perPage, ...config},
    });

    return useFetchAPI({url, method: "GET"});
};

/**
 * Fetches featured reviews for a movie.
 */
export const getFetchFeaturedReviewsByMovie = (
    {movieID, config}: FetchReviewsByMovieParams
): Promise<RequestReturns<unknown>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews/featured`,
        queries: config,
    });

    return useFetchAPI({url, method: "GET"});
};