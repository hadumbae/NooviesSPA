/**
 * @fileoverview React Query hook for fetching Genre collections using advanced aggregation.
 * Supports complex filtering, sorting, and non-standard pagination through
 * the repository's query/aggregation endpoint.
 */

import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import GenreRepository from "@/domains/genres/repositories/GenreRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";

/**
 * Parameters for the useFetchGenres hook.
 */
type FetchQueries<TData = unknown> = {
    queries?: GenreQueryOptions & RequestPaginationOptions;
    config?: RequestOptions;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving genres via the specialized aggregation query endpoint.
 */
export default function useFetchGenres<TData = unknown>(
    {queries, config, options}: FetchQueries<TData> = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenres = useQueryFnHandler({
        errorMessage: "Failed to fetch genres. Please try again.",
        action: () => GenreRepository.query({queries, config}),
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}