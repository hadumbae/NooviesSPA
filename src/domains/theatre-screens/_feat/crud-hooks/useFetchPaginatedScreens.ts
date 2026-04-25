/**
 * @fileoverview React Query hook for fetching paginated theatre screen data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {ScreenQueryOptions} from "@/domains/theatre-screens/schema/queries/ScreenQueryOptions.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {paginated} from "@/domains/theatre-screens/_feat/crud";

/** Parameters for the useFetchPaginatedScreens hook. */
export type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    pagination: PaginationValues;
    queries?: ScreenQueryOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/**
 * Fetches and validates a paginated list of theatre screens.
 */
export function useFetchPaginatedScreens<TData = unknown>(
    {schema, pagination, queries, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreens = buildQueryFn<TData>({
        action: () => paginated({pagination, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.paginated({...pagination, ...queries, ...config}),
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}