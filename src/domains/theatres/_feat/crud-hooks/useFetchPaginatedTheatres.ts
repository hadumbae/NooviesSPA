/**
 * @fileoverview React Query hook for fetching paginated and filtered Theatre data.
 * Abstracts the complexity of server-side pagination, query state synchronization,
 * and schema validation for administrative dashboard tables.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {TheatreQueryOptions} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOption.types.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {query} from "@/domains/theatres/_feat/crud";
import {ZodType, ZodTypeDef} from "zod";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/TheatreCRUDQueryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";

/**
 * Configuration object for the paginated theatre fetch.
 */
type FetchQueries<TData = unknown> = PaginationValues & {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: TheatreQueryOptions;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook to manage theatre pagination and filtering state.
 */
export function useFetchPaginatedTheatres<TData = unknown>(
    {schema, page, perPage, queries, config, options}: FetchQueries<TData>
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