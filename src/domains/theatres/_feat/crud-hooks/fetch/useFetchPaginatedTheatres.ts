/**
 * @fileoverview React Query hook for fetching paginated and filtered Theatre data.
 *
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {PaginatedQueryConfig} from "@/common/_types";

import {query} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

/**
 * Manages theatre pagination and filtering state.
 */
export function useFetchPaginatedTheatres<TData = unknown>(
    {schema, page, perPage, queries, config, options}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchTheatres = buildQueryFn<TData>({
        action: () => query({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchTheatres,
        ...useQueryOptionDefaults(options),
    });
}