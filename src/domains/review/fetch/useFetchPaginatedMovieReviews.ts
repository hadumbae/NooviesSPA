/**
 * @file React Query hook for fetching MovieReview collections.
 * useFetchMovieReviews.ts
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {MovieReviewQueryOptions} from "@/domains/review/schemas/options/MovieReviewQueryOptionsSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {MovieReviewCRUDRepository} from "@/domains/review/repositories/MovieReviewCRUDRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for useFetchMovieReviews.
 */
type FetchParams = {
    /**
     * Query filters used when retrieving movie reviews.
     */
    queries?: MovieReviewQueryOptions;

    /**
     * Additional HTTP request configuration.
     */
    config?: RequestOptions;

    /**
     * Optional React Query runtime configuration overrides.
     */
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches a collection of MovieReviews using React Query.
 */
export function useFetchMovieReviews(
    {queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => MovieReviewCRUDRepository.query({queries, config}),
        errorMessage: "Failed to fetch movie reviews. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_reviews", "lists", "paginated", {...queries, ...config}],
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}
