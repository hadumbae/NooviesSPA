/**
 * @fileoverview React Query hook for fetching a filtered list of Person entities.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {ListQueryConfig} from "@/common/_types";
import {query} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";

/**
 * Fetches and validates a list of Person entities based on provided filters and configuration.
 */
export function useFetchPersons<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPersons = buildQueryFn<TData>({
        schema,
        action: () => query({queries, config}),
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchPersons,
        ...useQueryOptionDefaults(options),
    });
}