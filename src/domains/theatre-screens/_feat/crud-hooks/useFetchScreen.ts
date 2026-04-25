/**
 * @fileoverview React Query hook for fetching a single theatre screen by its unique identifier.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {ZodType, ZodTypeDef} from "zod";
import {findByID} from "@/domains/theatre-screens/_feat/crud";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";

/** Parameters for the useFetchScreen hook. */
type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    _id: ObjectId;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Fetches and validates a single theatre screen record by ID.
 */
export function useFetchScreen<TData = unknown>(
    {schema, _id, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreen = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}