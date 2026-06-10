/**
 * @fileoverview React Query hook for fetching paginated RoleType records.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginatedQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {paginated, RoleTypeCRUDQueryKeys} from "@/domains/roletype/_feat";

/** Fetches paginated RoleType records using React Query. */
export function useFetchPaginatedRoleTypes<TData = unknown>(
    {schema, page, perPage, queries, options, config}: PaginatedQueryConfig<TData>,
): UseQueryResult<TData, HttpResponseError> {
    const fetchPaginatedRoleTypes = buildQueryFn<TData>({
        action: () => paginated({queries, config, pagination: {page, perPage}}),
        schema,
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchPaginatedRoleTypes,
        ...useQueryOptionDefaults(options),
    });
}
