/**
 * @file Movie review browse request builders.
 * ReviewsByMovieRepository.ts
 */

import {
    FetchPaginatedReviewsByMovieConfig,
    FetchReviewsByMovieConfig
} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/repository.types.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {ReviewsByMovieBaseURL} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/baseURL.ts";
import {PaginatedItems} from "@/common/types";
import {FeaturedReviewsByMovie, MovieReviewSummaryData, PopulatedMovieReview} from "@/domains/movie-reviews";

/**
 * Requests paginated reviews for a movie.
 */
export const getFetchReviewsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieConfig
): Promise<RequestReturns<PaginatedItems<PopulatedMovieReview>>> => {
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
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieConfig
): Promise<RequestReturns<MovieReviewSummaryData>> => {
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
    {movieID, config}: FetchReviewsByMovieConfig
): Promise<RequestReturns<FeaturedReviewsByMovie>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews/featured`,
        queries: config,
    });

    return useFetchAPI({url, method: "GET"});
};