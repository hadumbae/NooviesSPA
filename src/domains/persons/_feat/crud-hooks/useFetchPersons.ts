/**
 * @fileoverview React Query hook for fetching a filtered list of Person entities.
 * This hook is designed for unpaginated administrative queries, such as
 * populating search dropdowns or retrieving a subset of records based
 * on complex filters.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ZodType, ZodTypeDef} from "zod";
import {query} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import {PersonQueryOptions} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Configuration for the {@link useFetchPersons} hook.
 */
type FetchConfig<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: PersonQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook to retrieve Person records based on provided query filters.
 */
export default function useFetchPersons<TData = unknown>(
    {schema, queries, config, options}: FetchConfig<TData>
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