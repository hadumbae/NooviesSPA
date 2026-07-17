/**
 * @fileoverview Custom hook for fetching a single genre by its ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {ObjectId} from "@/common/_schemas";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {findByID} from "@/domains/genres/_feat/crud";

/**
 * Parameters for the useFetchGenre hook.
 */
type FetchParams<TData = unknown> = {
    _id: ObjectId;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository.
 */
export function useFetchGenre<TData = unknown>(
    {_id, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenre = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}