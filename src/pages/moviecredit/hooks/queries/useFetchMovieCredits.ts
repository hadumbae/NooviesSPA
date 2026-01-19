/**
 * @file useFetchMovieCredits.ts
 *
 * @summary
 * React Query hook for fetching movie credit data with filtering and defaults.
 *
 * @description
 * Wraps a movie credit query in a standardized `useQuery` hook that:
 * - Merges query filters and request options
 * - Removes nullish query attributes before execution
 * - Applies shared React Query default options
 * - Normalizes error handling via `useQueryFnHandler`
 *
 * This hook is intended to be the primary access point for fetching
 * movie credit data throughout the application.
 *
 * @example
 * ```ts
 * const {data, isLoading, error} = useFetchMovieCredits({
 *   queries: {movie: movieId},
 *   queryOptions: {enabled: !!movieId},
 * });
 * ```
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {MovieCreditQueryOptions} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchMovieCredits}.
 *
 * @template TData - Expected response data shape
 */
type FetchQueries<TData = unknown> = {
    /** Optional query filters for movie credits */
    queries?: MovieCreditQueryOptions;

    /** Optional request-level configuration */
    queryConfig?: RequestOptions;

    /** Optional React Query configuration overrides */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetches movie credits using React Query.
 *
 * @template TData - Expected response data type
 * @param params - Query filters, request config, and query options
 * @returns React Query result containing movie credit data or error state
 */
export default function useFetchMovieCredits<TData = unknown>(
    {queries, queryConfig, queryOptions}: FetchQueries<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const fetchMovieCredits = useQueryFnHandler({
        action: () => MovieCreditRepository.query({queries, config: queryConfig}),
        errorMessage: "Failed to fetch movie credit data. Please try again.",
    });

    return useQuery({
        queryKey: ["movie_credits", "lists", "query", {...queries, ...queryConfig}],
        queryFn: fetchMovieCredits,
        ...useQueryOptionDefaults(queryOptions),
    });
}
