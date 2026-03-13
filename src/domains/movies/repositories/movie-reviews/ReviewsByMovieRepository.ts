/**
 * @file Movie review browse request builders.
 * ReviewsByMovieRepository.ts
 */

import {
    FetchPaginatedReviewsByMovieParams,
    FetchReviewsByMovieParams
} from "@/domains/movies/repositories/movie-reviews/ReviewsByMovieRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Base endpoint for movie browse requests.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/browse/movies`;

/**
 * Requests paginated reviews for a movie.
 */
export const getFetchReviewsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `item/${movieID}/reviews`,
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
    const url = buildQueryURL({
        baseURL,
        path: `item/${movieID}/reviews/details`,
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
    const url = buildQueryURL({
        baseURL,
        path: `item/${movieID}/reviews/featured`,
        queries: config,
    });

    return useFetchAPI({url, method: "GET"});
};