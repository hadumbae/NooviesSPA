/**
 * @fileoverview React Query hook for fetching paginated and filtered Person data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {PaginatedQueryConfig} from "@/common/_types";
import {query} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";

/** Retrieves a paginated and validated list of Person entities. */
export function useFetchPaginatedPersons<TData = unknown>(
    {page, perPage, schema, queries, config, options}: PaginatedQueryConfig<TData>,
): UseQueryResult<TData, HttpResponseError> {
    const fetchPersons = buildQueryFn<TData>({
        action: () => query({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys.queryPaginated({page, perPage, ...queries, ...config}),
        queryFn: fetchPersons,
        ...useQueryOptionDefaults(options),
    });
}