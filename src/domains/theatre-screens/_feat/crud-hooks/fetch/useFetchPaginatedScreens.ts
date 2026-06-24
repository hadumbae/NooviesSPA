/**
 * @fileoverview React Query hook for fetching paginated theatre screen data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {PaginatedQueryConfig} from "@/common/types";

import {paginated} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenQueryOptions} from "@/domains/theatre-screens/_schema";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/keys";

/**
 * Fetches and validates a paginated list of theatre screens.
 */
export function useFetchPaginatedScreens<TData = unknown>(
    {schema, page, perPage, queries, config, options}: PaginatedQueryConfig<TData, TheatreScreenQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreens = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchScreens,
        ...useQueryOptionDefaults(options),
    });
}