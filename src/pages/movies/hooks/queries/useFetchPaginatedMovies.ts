import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {MovieQueryOptions} from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Parameters for {@link useFetchPaginatedMovies}.
 *
 * @template TData - Expected paginated response type.
 */
type FetchParams<TData = unknown> = PaginationValues & {
    /**
     * Optional query filters for searching, sorting, or refining results.
     */
    queries?: MovieQueryOptions;

    /**
     * Optional request-level configuration (excluding pagination limit).
     */
    queryConfig?: Omit<RequestOptions, "limit">;

    /**
     * Optional React Query configuration overrides.
     *
     * @remarks
     * Merged with defaults from {@link useQueryOptionDefaults}.
     */
    queryOptions?: UseQueryOptions<TData>;
};

/**
 * Fetches a paginated list of movies.
 *
 * @remarks
 * - Uses {@link MovieRepository.paginated} for data retrieval.
 * - Supports pagination via {@link PaginationValues}.
 * - Filters nullish query parameters before sending the request.
 * - Wraps the query function with {@link useQueryFnHandler} for
 *   consistent error handling.
 *
 * @template TData - Expected paginated response type.
 *
 * @param params - Pagination, filters, request config, and query options.
 *
 * @returns React Query result containing paginated movie data.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedMovies({
 *   page: 1,
 *   perPage: 12,
 *   queries: { genre: "Action" },
 * });
 * ```
 */
export default function useFetchPaginatedMovies<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const {
        page,
        perPage,
        queries = {},
        queryConfig,
        queryOptions,
    } = params;

    // --- OPTIONS ---
    const filteredQueries = filterNullishAttributes({...queries, ...queryConfig});
    const optionsWithDefaults = useQueryOptionDefaults(queryOptions);

    // --- QUERY FN ---
    const fetchPaginatedMovies = useQueryFnHandler({
        action: () => MovieRepository.paginated({page, perPage, queries: filteredQueries}),
        errorMessage: "Failed to fetch movies. Please try again.",
    });

    // --- QUERY ---
    return useQuery({
        queryKey: ["fetch_paginated_movies", filteredQueries],
        queryFn: fetchPaginatedMovies,
        ...optionsWithDefaults,
    });
}
