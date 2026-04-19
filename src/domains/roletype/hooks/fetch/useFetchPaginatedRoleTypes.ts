/**
 * @file useFetchPaginatedRoleTypes.ts
 *
 * React Query hook for fetching paginated `RoleType` records.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { PaginationValues } from "@/common/features/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import { RoleTypeQueryOptions } from "@/domains/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { FetchQueryOptions } from "@/common/type/query/FetchQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/domains/roletype/repositories/RoleTypeRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for fetching paginated role types.
 */
type FetchParams = PaginationValues & {
    /** Role type-specific filters */
    queries?: RoleTypeQueryOptions;

    /** Request-level configuration */
    config?: RequestOptions;

    /** React Query options */
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches paginated `RoleType` records using React Query.
 *
 * @param params - Pagination, filters, and query options
 *
 * @returns A {@link UseQueryResult} containing paginated role types or an error.
 *
 * @example
 * ```ts
 * const { data } = useFetchPaginatedRoleTypes({
 *   page: 1,
 *   perPage: 20,
 *   queries: { department: "CREW" },
 * });
 * ```
 */
export function useFetchPaginatedRoleTypes(
    {page, perPage, queries, options, config}: FetchParams,
): UseQueryResult<unknown, HttpResponseError> {
    const fetchPaginatedRoleTypes = useQueryFnHandler({
        action: () => RoleTypeRepository.paginated({ page, perPage, queries, config }),
        errorMessage: "Failed to fetch paginated role types. Please try again.",
    });

    return useQuery({
        queryKey: ["roleTypes", "lists", "paginated", {page, perPage, ...queries, ...config}],
        queryFn: fetchPaginatedRoleTypes,
        ...useQueryOptionDefaults(options),
    });
}
