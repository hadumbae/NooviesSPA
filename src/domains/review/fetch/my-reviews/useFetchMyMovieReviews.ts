/**
 * @file React Query hook for fetching the current user's MovieReviews.
 * useFetchMyMovieReviews.ts
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {
    getFetchMovieReviewsByCurrentUser
} from "@/domains/review/repositories/my-movie-review/MyMovieReviewRepository.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for useFetchMyMovieReviews.
 */
type FetchParams = PaginationValues & {
    /**
     * Optional HTTP request configuration.
     */
    config?: RequestOptions;

    /**
     * Optional React Query runtime configuration overrides.
     */
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches a paginated collection of MovieReviews
 * belonging to the currently authenticated user.
 */
export function useFetchMyMovieReviews(
    {page, perPage, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const fetchReviews = useQueryFnHandler({
        action: () => getFetchMovieReviewsByCurrentUser({page, perPage, config}),
        errorMessage: "Failed to fetch user's movie reviews. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_reviews", "lists", "current", config],
        queryFn: fetchReviews,
        ...useQueryOptionDefaults(options),
    });
}