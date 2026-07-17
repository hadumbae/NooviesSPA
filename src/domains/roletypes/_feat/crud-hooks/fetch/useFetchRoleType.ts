/**
 * @fileoverview React Query hook for fetching a single RoleType by its unique ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {IDQueryConfig} from "@/common/_types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {findByID} from "@/domains/roletypes/_feat/crud";
import {RoleTypeCRUDQueryKeys} from "@/domains/roletypes/_feat/crud-hooks/keys";

/** Fetches a RoleType document and validates it against a provided schema. */
export function useFetchRoleType<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchRoleType = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: RoleTypeCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchRoleType,
        ...useQueryOptionDefaults(options),
    });
}
