/**
 * @fileoverview React Query hook for fetching a single Genre by its ObjectId.
 * Orchestrates ID-based retrieval with standardized error handling and
 * consistent query key management.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findByID} from "@/domains/genres/_feat/crud";

/**
 * Parameters for the useFetchGenre hook.
 */
export type FetchParams<TData = unknown> = {
    _id: ObjectId;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository.
 */
export default function useFetchGenre<TData = unknown>(
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