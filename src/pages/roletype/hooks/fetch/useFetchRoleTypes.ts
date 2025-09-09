import {EntityPaginatedQuery, RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {RoleTypeQueryOptions} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import RoleTypeRepository from "@/pages/roletype/repositories/RoleTypeRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for fetching role types via `useFetchRoleTypes`.
 *
 * Combines:
 * - Request options (`populate`, `virtuals`, `limit`)
 * - Pagination settings (`paginated`, `page`, `perPage`)
 * - RoleType-specific query filters and sorts (`roleName`, `department`, etc.)
 */
type FetchParams = RequestOptions & EntityPaginatedQuery & RoleTypeQueryOptions;

/**
 * Custom React hook to fetch `RoleType` records using the provided query parameters.
 *
 * @param queries - Parameters controlling filters, sorts, pagination, and request options.
 *
 * @returns A React Query `useQuery` result containing:
 * - `data` - The fetched role types (may be undefined initially).
 * - `error` - Any error that occurred during fetch.
 * - `isLoading` / `isFetching` - Query loading states.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchRoleTypes({
 *   paginated: true,
 *   page: 1,
 *   perPage: 10,
 *   roleName: "Actor",
 *   department: "CAST",
 *   populate: true,
 *   virtuals: false
 * });
 * ```
 */
export default function useFetchRoleTypes(queries: FetchParams): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = ["fetch_role_types_by_query", queries];

    const fetchRoleType = useQueryFnHandler({
        action: () => RoleTypeRepository.query({ queries }),
        errorMessage: "Failed to fetch roletypes.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchRoleType,
        staleTime: 1000 * 60, // 1 minute
        placeholderData: (previousData) => previousData,
    });
}