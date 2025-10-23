import { RoleTypeQueryOptions } from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for fetching role types via {@link useFetchRoleTypes}.
 *
 * Combines:
 * - {@link RequestOptions} — controls population, virtual fields, and result limits
 * - {@link RequestPaginationOptions} — pagination settings (`paginated`, `page`, `perPage`)
 * - {@link RoleTypeQueryOptions} — role type-specific filters and sorts (`roleName`, `department`, etc.)
 *
 * @template TData - The expected shape of the fetched data.
 */
type FetchParams<TData = unknown> = {
    queries?: RequestOptions & RequestPaginationOptions & RoleTypeQueryOptions;
    options?: UseQueryOptions<TData>;
};

/**
 * React Query hook to fetch `RoleType` records using optional filters, sorts, and pagination.
 *
 * @template TData - The type of the returned role type data (e.g., array or paginated object).
 *
 * @param params - Optional object containing `queries` and `options`.
 * @param params.queries - Filters, sorts, pagination, and request options.
 * @param params.options - {@link UseQueryOptions} to control caching, initial data, and query behavior.
 *
 * @returns A {@link UseQueryResult} containing the fetched role types or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchRoleTypes({
 *   queries: {
 *     paginated: true,
 *     page: 1,
 *     perPage: 10,
 *     roleName: "Actor",
 *     department: "CAST",
 *     populate: true,
 *     virtuals: false
 *   },
 *   options: {
 *     staleTime: 60000
 *   }
 * });
 * ```
 */
export default function useFetchRoleTypes<TData = unknown>(
    params?: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {
        queries = {},
        options: {
            enabled = true,
            staleTime = 1000 * 60,
            placeholderData = (previousData: TData | undefined) => previousData,
            initialData
        } = {},
    } = params || {};

    const queryKey = ["fetch_role_types_by_query", queries];

    const fetchRoleType = useQueryFnHandler({
        action: () => RoleTypeRepository.query({ queries }),
        errorMessage: "Failed to fetch roletypes.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchRoleType,
        staleTime,
        placeholderData,
        initialData,
        enabled,
    });
}
