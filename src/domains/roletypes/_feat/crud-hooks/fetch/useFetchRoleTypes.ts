/**
 * @fileoverview Hook for fetching and validating a list of role types.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {ListQueryConfig} from "@/common/_types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {find} from "@/domains/roletypes/_feat/crud";
import {RoleTypeCRUDQueryKeys} from "@/domains/roletypes/_feat/crud-hooks/keys";

/** Fetches a list of role types based on provided query parameters and schema validation. */
export function useFetchRoleTypes<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchRoleTypes = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchRoleTypes,
        ...useQueryOptionDefaults(options),
    });
}
