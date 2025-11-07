import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { MovieQueryOptions } from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for the {@link useFetchMovies} hook.
 *
 * @template TData - The expected data type returned by the query.
 */
type FetchParams<TData = unknown> = RequestOptions & {
    /**
     * Optional filters or query parameters to refine the movie retrieval.
     * See {@link MovieQueryOptions} for available filter fields.
     */
    queries?: MovieQueryOptions;

    /**
     * Optional React Query configuration, controlling cache, refetch, and placeholder behavior.
     *
     * @defaultValue Uses {@link useQueryOptionDefaults} for sensible defaults
     * (`enabled: true`, `staleTime: 60_000`, etc.).
     */
    options?: UseQueryOptions<TData>;
};

/**
 * **`useFetchAllMovies`** — React Query hook for fetching all movies from the API.
 *
 * @remarks
 * - Wraps {@link MovieRepository.getAll} to retrieve all movie entities at once.
 * - Uses {@link useQueryFnHandler} to standardize API error handling and
 *   return structured {@link HttpResponseError} objects.
 * - Merges user-supplied React Query options with defaults from {@link useQueryOptionDefaults}.
 *
 * @template TData - The type of the returned data.
 *
 * @param params - Optional parameters controlling the request, including:
 * - `queries`: Filtering options for the movie query.
 * - `options`: React Query configuration such as `staleTime` or `enabled`.
 * - Any {@link RequestOptions} for network configuration (headers, auth, etc.).
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data`: The fetched movie list (typed as `TData`).
 * - `isLoading`, `isError`, and `error` for query state handling.
 * - `refetch` and other React Query utilities.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchAllMovies({
 *   queries: { genre: "Action", releasedAfter: "2020-01-01" },
 *   options: { staleTime: 300_000 }
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorBanner message={error.message} />;
 *
 * return <MovieList movies={data} />;
 * ```
 */
export default function useFetchMovies<TData = unknown>(
    params: FetchParams<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const { queries = {}, options = useQueryOptionDefaults(), ...requestOptions } = params;

    const queryKey = ["fetch_movies", { queries, options, requestOptions }];

    const fetchMovies = useQueryFnHandler({
        action: () => MovieRepository.getAll({ queries: queries, ...requestOptions }),
        errorMessage: "Failed to fetch movies. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchMovies,
        ...options
    });
}
