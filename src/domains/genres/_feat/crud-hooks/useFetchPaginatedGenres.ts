/**
 * @fileoverview React Query hook for fetching paginated Genre collections.
 * Simplifies the orchestration of pagination, domain-specific filters,
 * and repository-level configuration.
 */

import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {paginated} from "@/domains/genres/_feat/crud";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";

/**
 * Parameters for the useFetchPaginatedGenres hook.
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    queries?: GenreQueryOptions;
    config?: RequestOptions;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving paginated genres via the CRUD repository.
 */
export default function useFetchPaginatedGenres<TData = unknown>(
    {page, perPage, queries, config, options}: FetchQueries<TData>
): UseQueryResult<unknown, HttpResponseError> {
    const fetchGenres = useQueryFnHandler({
        errorMessage: "Failed to fetch genres. Please try again.",
        action: () => paginated({config, queries, pagination: {page, perPage}}),
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}