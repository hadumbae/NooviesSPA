/**
 * @file useFetchTheatres.ts
 *
 * React Query hook for fetching theatres by query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {TheatreQueryOptions} from "@/domains/theatres/schema/queries/TheatreQueryOption.types.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/TheatreCRUDQueryKeys.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {ZodType, ZodTypeDef} from "zod";
import {query} from "@/domains/theatres/_feat/crud";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";

/**
 * Parameters for `useFetchTheatres`.
 */
type FetchQueries<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: TheatreQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
}

/**
 * Fetch theatres using query filters.
 */
export function useFetchTheatres<TData = unknown>(
    {schema, queries, config, options}: FetchQueries<TData>
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
