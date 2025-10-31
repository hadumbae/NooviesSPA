import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { PaginationParamValues } from "@/common/hooks/search-params/usePaginationSearchParams.types.ts";
import { MovieQueryOptions } from "@/pages/movies/schema/queries/MovieFilter.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Parameters for the {@link useFetchPaginatedMovies} hook.
 *
 * @template TData - The expected shape of the paginated movie response.
 */
type FetchParams<TData = unknown> = RequestOptions & PaginationParamValues & {
    /**
     * Optional query filters to refine, search, or sort the paginated movie results.
     */
    queries?: MovieQueryOptions;

    /**
     * React Query configuration for caching, refetching, and placeholder behavior.
     *
     * @defaultValue Uses defaults from {@link useQueryOptionDefaults}.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * **`useFetchPaginatedMovies`**
 *
 * React Query hook to fetch a paginated list of movies from the API using
 * {@link MovieRepository.paginated}.
 *
 * @remarks
 * - Supports pagination via `page` and `perPage`.
 * - Query filters can be applied using `queries`.
 * - Wraps the request in {@link useQueryFnHandler} for standardized error handling.
 * - Uses {@link useQueryOptionDefaults} for default React Query settings like
 *   `enabled`, `staleTime`, and `placeholderData`.
 *
 * @template TData - The type of data expected in the paginated response.
 *
 * @param params - Configuration object containing:
 * - `page` and `perPage` for pagination
 * - `queries` for filtering and sorting
 * - `options` for React Query configuration
 * - any {@link RequestOptions} such as headers or authentication info
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data`: Paginated movie data (`TData`)
 * - `isLoading`, `isError`, and `error` for query state
 * - `refetch` and other React Query utilities
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchPaginatedMovies({
 *   page: 1,
 *   perPage: 20,
 *   queries: { genre: "Action", releasedAfter: "2020-01-01" },
 *   options: { staleTime: 120_000 }
 * });
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorBanner message={error.message} />;
 *
 * return <MovieGrid movies={data.items} total={data.total} />;
 * ```
 */
export default function useFetchPaginatedMovies<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        page,
        perPage,
        queries = {},
        options = useQueryOptionDefaults(),
        ...requestOptions
    } = params;

    const queryKey = ["fetch_paginated_movies", { page, perPage, queries, options, requestOptions }];

    const fetchPaginatedMovies = useQueryFnHandler({
        action: () => MovieRepository.paginated({ page, perPage, queries, ...requestOptions }),
    });

    return useQuery({
        queryKey,
        queryFn: fetchPaginatedMovies,
        ...options,
    });
}
