/**
 * @file useFetchRoleTypes.ts
 *
 * React Query hook for fetching role types using filters, sorting,
 * and optional pagination.
 */

import { RoleTypeQueryOptions } from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching role types.
 */
type FetchParams = {
    /** Role type-specific filters and sorts */
    queries?: RoleTypeQueryOptions;

    /** Request-level configuration */
    config?: RequestOptions;

    /** React Query options */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches role types using optional filters and request options.
 *
 * @param params - Fetch parameters
 *
 * @returns A {@link UseQueryResult} containing role type data or an error.
 *
 * @example
 * ```ts
 * const { data } = useFetchRoleTypes({
 *   queries: { department: "CAST" },
 * });
 * ```
 */
export default function useFetchRoleTypes(
    {queries, config, options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchRoleTypes = useQueryFnHandler({
        action: () => RoleTypeRepository.query({ queries }),
        errorMessage: "Failed to fetch role types.",
    });

    return useQuery({
        queryKey: ["roleTypes", "lists", "query", {...queries, ...config}],
        queryFn: fetchRoleTypes,
        ...useQueryOptionDefaults(options),
    });
}
