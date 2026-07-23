/**
 * @fileoverview Hook for fetching a single user by their unique identifier.
 */

import {IDQueryConfig} from "@/common/_types";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn, useQueryOptionDefaults} from "@/common/_feat";
import {findByID} from "@/domains/users/_feat/crud";
import {UserCRUDQueryKeys} from "@/domains/users/_feat/crud-hooks/keys";

/** Fetches a user document and validates it against the provided schema. */
export function useFetchUser<TData = unknown>(
    {_id, schema, options, config}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchUser = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: UserCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchUser,
        ...useQueryOptionDefaults(options),
    });
}