/**
 * @fileoverview React Query hook for fetching paginated and filtered Person data.
 * Orchestrates the retrieval of Person entities for administrative interfaces,
 * integrating Zod validation and standardized pagination logic.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ZodType, ZodTypeDef } from "zod";
import { query } from "@/domains/persons/_feat/crud";
import { PersonCRUDQueryKeys } from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import { PersonQueryOptions } from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { PaginationValues } from "@/common/features/fetch-pagination-search-params";
import { buildQueryFn } from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Configuration parameters for the {@link useFetchPaginatedPersons} hook.
 */
type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    pagination: PaginationValues;
    queries?: PersonQueryOptions;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook to retrieve a paginated and filtered list of Person entities.
 */
export function useFetchPaginatedPersons<TData = unknown>(
    {pagination: {page, perPage}, schema, queries, config, options}: FetchParams<TData>,
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