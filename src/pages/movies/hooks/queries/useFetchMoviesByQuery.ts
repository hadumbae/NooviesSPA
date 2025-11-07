import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { MovieQueryFilters } from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Combined query parameters for fetching movie data.
 *
 * @template TData The expected type of the data returned by the query.
 */
export type QueryParams<TData = unknown> = {
    /**
     * Combined parameters for the query.
     * @see {@link RequestOptions}
     * @see {@link RequestPaginationOptions}
     * @see {@link MovieQueryFilters}
     */
    queries?: RequestOptions & RequestPaginationOptions & MovieQueryFilters;

    /**
     * Optional settings to customize the behavior of the query.
     * @see {@link UseQueryOptions}
     */
    options?: UseQueryOptions<TData>;
};

/**
 * React hook to fetch paginated, filtered movie data.
 *
 * @template TData The expected type of the data returned by the query. Can be an array or object.
 *
 * @param params - Object containing query parameters and query options.
 * @param params.queries - Combined parameters for the query.
 * @param params.options - Optional settings for the query.
 *   @see {@link UseQueryOptions#enabled}
 *   @see {@link UseQueryOptions#staleTime}
 *   @see {@link UseQueryOptions#initialData}
 *   @see {@link UseQueryOptions#placeholderData}
 *
 * @returns A {@link UseQueryResult} containing:
 *   - `data` – The fetched movie data (or undefined initially)
 *   - `error` – An {@link HttpResponseError} if the query fails
 *   - Status flags like `isLoading`, `isFetching`, `isError`, etc.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchMovies<Movie[]>({
 *   queries: { page: 1, limit: 10, populate: true },
 *   options: { staleTime: 1000 * 30 }
 * });
 * if (isLoading) return <Spinner />;
 * if (error) return <div>{error.message}</div>;
 * return <MovieList movies={data} />;
 * ```
 */
export default function useFetchMoviesByQuery<TData = unknown>(
    params?: QueryParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        queries = {},
        options: {
            enabled = true,
            staleTime = 1000 * 60,
            placeholderData = (previousData: TData | undefined) => previousData,
            initialData,
        } = {},
    } = params || {};

    const queryKey = ["fetch_movies_by_query", queries] as const;

    const fetchMovies = useQueryFnHandler({
        action: () => MovieRepository.query({ queries }),
        errorMessage: "Failed to fetch movie data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovies,
        enabled,
        staleTime,
        placeholderData,
        initialData,
    });
}
