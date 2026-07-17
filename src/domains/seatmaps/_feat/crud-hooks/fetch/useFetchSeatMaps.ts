/**
 * @fileoverview React Query hook for fetching and validating a list of seat maps.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {find} from "@/domains/seatmaps/_feat/crud";
import {ListQueryConfig} from "@/common/_types";
import {SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";

/** Fetches a collection of seat maps based on provided query parameters and validation schema. */
export function useFetchSeatMaps<TData = unknown>(
    {queries, options, config, schema}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchData = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: SeatMapCRUDQueryKeys.list({...queries, ...config}),
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}
