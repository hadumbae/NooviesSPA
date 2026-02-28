/**
 * @file Repository function for fetching reviews by movie ID.
 * ReviewsByMovieRepository.ts
 */

import {FetchReviewsByMovieParams} from "@/pages/movies/repositories/movie-reviews/ReviewsByMovieRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Base API endpoint for movie browsing routes.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/browse/movies`;

/**
 * Builds and executes a request to fetch paginated reviews
 * for a specific movie.
 *
 * Responsibilities:
 * - Constructs a query URL using movie ID and pagination params.
 * - Merges additional request configuration into query params.
 * - Executes a GET request via the shared fetch abstraction.
 *
 * @param params Parameters required to fetch movie reviews.
 *
 * @returns A promise returned by useFetchAPI resolving
 * to the server response.
 */
export const getFetchReviewsByMovie = (
    {movieID, page, perPage, config}: FetchReviewsByMovieParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `item/${movieID}/reviews`,
        queries: {page, perPage, ...config},
    });

    return useFetchAPI({url, method: "GET"});
};