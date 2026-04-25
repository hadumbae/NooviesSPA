/**
 * @fileoverview React Query hook for fetching theatre screens based on query filters.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ScreenQueryOptions} from "@/domains/theatre-screens/schema/queries/ScreenQueryOptions.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {find} from "@/domains/theatre-screens/_feat/crud";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {ZodType, ZodTypeDef} from "zod";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";

/** Parameters for the useFetchScreens hook. */
type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: ScreenQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/**
 * Fetches and validates a list of theatre screens using standardized query filtering.
 */
export function useFetchScreens<TData = unknown>(
    {schema, queries, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreens = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}