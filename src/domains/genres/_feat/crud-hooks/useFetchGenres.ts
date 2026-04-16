/**
 * @fileoverview React Query hook for fetching Genre collections using aggregation.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {query} from "@/domains/genres/_feat/crud";
import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptionsSchema.ts";

/**
 * Parameters for the useFetchGenres hook.
 */
type FetchQueries<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: GenreQueryOptions & RequestPaginationOptions;
    config?: RequestOptions;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving genres via the aggregation query endpoint.
 */
export default function useFetchGenres<TData = unknown>(
    {schema, queries, config, options}: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenres = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchGenres,
        ...useQueryOptionDefaults(options),
    });
}