/**
 * @file useFetchMovie.ts
 *
 * React Query hook for fetching a single movie by ID.
 * Provides a typed, standardized interface for retrieving movie data
 * with consistent error handling and shared query defaults.
 */

import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchMovie}.
 *
 * @template TData
 * Optional transformed response type.
 */
export type FetchParams<TData = unknown> = {
    /**
     * Movie identifier.
     */
    _id: ObjectId;

    /**
     * Request-level configuration (excluding pagination limit).
     */
    config?: Omit<RequestOptions, "limit">;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * # useFetchMovie Hook
 *
 * Fetches a single movie by its unique identifier.
 *
 * Integrates:
 * - **MovieRepository** for API access
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @template TData
 * Optional transformed response type.
 *
 * @param params
 * Movie ID, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing movie data or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchMovie({
 *   _id: movieId,
 * });
 * ```
 */
export default function useFetchMovie<TData = unknown>(
    {_id, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovie = useQueryFnHandler({
        action: () => MovieRepository.get({_id, config}),
        errorMessage: "Failed to fetch movie data. Please try again.",
    });

    return useQuery({
        queryKey: ["movies", "_id", {_id, ...config}],
        queryFn: fetchMovie,
        ...useQueryOptionDefaults(options),
    });
}
