/**
 * @fileoverview Hook for fetching paginated user data with validation and caching.
 */

import {PaginatedQueryConfig} from "@/common/_types";
import {UserQueryOptions} from "@/domains/users/_schema/query-options";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn, useQueryOptionDefaults} from "@/common/_feat";
import {paginated} from "@/domains/users/_feat/crud";
import {UserCRUDQueryKeys} from "@/domains/users/_feat/crud-hooks/keys";

/** Fetches a paginated list of users and validates the response against a schema. */
export function useFetchPaginatedUsers<TData = unknown>(
    {queries, schema, options, config, ...pagination}: PaginatedQueryConfig<TData, UserQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchUsers = buildQueryFn<TData>({
        action: () => paginated({pagination, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: UserCRUDQueryKeys.paginated({...pagination, ...queries, ...config}),
        queryFn: fetchUsers,
        ...useQueryOptionDefaults(options),
    });
}