/**
 * @file useFetchMovies.ts
 *
 * React Query hook for fetching movies from the backend.
 * Provides a standardized interface for querying movie data with
 * support for filtering, request configuration, and query overrides.
 */

import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {MovieQueryOptions} from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for {@link useFetchMovies}.
 *
 * @template TData
 * Optional transformed response type.
 */
type FetchParams<TData = unknown> = {
    /**
     * Movie query filters (e.g. title, genre, release year).
     */
    queries?: MovieQueryOptions;

    /**
     * Request-level configuration (headers, abort signal, etc.).
     */
    config?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * # useFetchMovies Hook
 *
 * Fetches a list of movies using React Query.
 *
 * Integrates:
 * - **MovieRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared query defaults
 *
 * @template TData
 * Optional transformed response type.
 *
 * @param params
 * Query filters, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing movie data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchMovies({
 *   queries: { title: "Inception" },
 * });
 * ```
 */
export default function useFetchMovies<TData = unknown>(
    {queries, config, options}: FetchParams<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchMovies = useQueryFnHandler({
        action: () => MovieRepository.query({queries, config}),
        errorMessage: "Failed to fetch movies. Please try again.",
    });

    return useQuery({
        queryKey: ["movies", "lists", "query", {...queries, ...config}],
        queryFn: fetchMovies,
        ...useQueryOptionDefaults(options),
    });
}
