/**
 * @fileoverview Hook for fetching and validating paginated showing data.
 */

import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {PaginatedQueryConfig} from "@/common/types";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {paginated} from "@/domains/showings/_feat/crud";
import {ShowingCRUDQueryKeys} from "@/domains/showings/_feat/crud-hooks/keys";

/** Fetches a paginated list of showings with runtime schema validation. */
export function useFetchPaginatedShowings<TData = unknown>(
    {page, perPage, queries, config, options, schema}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchShowings = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: ShowingCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchShowings,
        ...useQueryOptionDefaults(options),
    });
}
