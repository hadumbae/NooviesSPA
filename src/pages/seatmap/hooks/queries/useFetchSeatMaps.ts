/**
 * @file useFetchSeatMaps.ts
 *
 * React Query hook for fetching seat map data by query.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchByQueryParams} from "@/common/type/query/FetchByQueryParams.ts";
import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOptions.ts";

/**
 * Fetch seat maps using query filters.
 *
 * @template TData - Returned data shape.
 *
 * @param params - Query filters, request config, and query options.
 * @returns React Query result for the seat map request.
 */
export default function useFetchSeatMaps<TData = unknown>(
    params: FetchByQueryParams<SeatMapQueryOptions, TData>
): UseQueryResult<TData, HttpResponseError> {
    const {queries, queryConfig, queryOptions} = params;

    const urlQueries = {...queries, ...queryConfig};

    const fetchData = useQueryFnHandler({
        errorMessage: "Failed to fetch seat map. Please try again.",
        action: () => SeatMapRepository.query({queries: urlQueries}),
    });

    return useQuery({
        queryKey: ["fetch_seat_maps_by_query", urlQueries],
        queryFn: fetchData,
        ...useQueryOptionDefaults(queryOptions),
    });
}
