/**
 * @fileoverview Hook for fetching paginated seat collections with schema validation and query filtering.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SeatQueryOptions} from "@/domains/seats/_feat/handle-query-options/SeatQueryOptions.ts";
import {PaginatedQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

import {paginated} from "@/domains/seats/_feat/crud";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";

/**
 * Retrieves a paginated list of seats based on provided page constraints and domain-specific filters.
 */
export function useFetchPaginatedSeats<TData = unknown>(
    {schema, page, perPage, queries, config, options}: PaginatedQueryConfig<TData, SeatQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeats = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchSeats,
        ...useQueryOptionDefaults(options),
    });
}