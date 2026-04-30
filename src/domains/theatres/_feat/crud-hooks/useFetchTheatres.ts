/**
 * @file useFetchTheatres.ts
 *
 * React Query hook for fetching theatres by query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/queryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {query} from "@/domains/theatres/_feat/crud";
import {ListQueryConfig} from "@/common/types";


/**
 * Fetch theatres using query filters.
 */
export function useFetchTheatres<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {

    const fetchTheatres = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchTheatres,
        ...useQueryOptionDefaults(options),
    });
}
