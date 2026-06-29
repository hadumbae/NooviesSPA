/**
 * @fileoverview Hook for fetching paginated seat map data with validation.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginatedQueryConfig} from "@/common/types";
import {paginated} from "@/domains/seatmaps/_feat/crud";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/** Fetches a paginated list of seat maps and validates the response against a schema. */
export function useFetchPaginatedSeatMaps<TData = unknown>(
    {page, perPage, queries, config, options, schema}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeatMap = buildQueryFn<TData>({
        action: () => paginated({queries, config, pagination: {page, perPage}}),
        schema,
    });

    return useQuery({
        queryKey: SeatMapCRUDQueryKeys.paginated({page, perPage, ...config, ...queries}),
        queryFn: fetchSeatMap,
        ...useQueryOptionDefaults(options),
    });
}
