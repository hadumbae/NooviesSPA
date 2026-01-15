/**
 * @file useFetchGenres.ts
 *
 * React Query hook for fetching genre collections using query filters.
 */

import { GenreQueryOptions } from "@/pages/genres/schema/filters/GenreQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { RequestOptions, RequestPaginationOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchGenres}.
 *
 * @template TData - Optional transformed response type.
 */
type FetchQueries<TData = unknown> = {
    /** Genre-specific query filters and pagination. */
    queries?: GenreQueryOptions & RequestPaginationOptions;

    /** Repository request options. */
    config?: RequestOptions;

    /** React Query configuration overrides. */
    options?: UseQueryOptions<TData>;
};

/**
 * Fetches genres using query-based filters.
 *
 * @remarks
 * - Delegates querying to {@link GenreRepository.query}
 * - Removes nullish query values automatically
 *
 * @param params - Query, request, and React Query options.
 * @returns React Query result containing genre collection data.
 */
export default function useFetchGenres<TData = unknown>(
    { queries, config, options }: FetchQueries<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenres = useQueryFnHandler({
        errorMessage: "Failed to fetch genres. Please try again.",
        action: () => GenreRepository.query({ queries, config }),
    });

    return useQuery({
        queryKey: ["genres", "list", "query", { ...queries, ...config }],
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}
