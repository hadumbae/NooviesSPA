/**
 * @file useFetchSeatMaps.ts
 *
 * React Query hook for fetching seat map data using query filters.
 *
 * Acts as a thin integration layer between React Query
 * and {@link SeatMapRepository}.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for {@link useFetchSeatMaps}.
 */
type FetchParams = {
    /** Seat map query filters */
    queries?: SeatMapQueryOptions;

    /** React Query configuration overrides */
    options?: UseQueryOptions<unknown>;

    /** HTTP request configuration */
    config?: RequestOptions;
};

/**
 * Fetches seat maps using structured query filters.
 *
 * @template TData
 * Expected response data shape.
 *
 * @remarks
 * - Errors are normalized via {@link useQueryFnHandler}
 * - Default React Query options are applied automatically
 * - Query key is derived from query filters and request config
 *
 * @param params
 * Query filters, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing seat map data or a {@link HttpResponseError}.
 */
export default function useFetchSeatMaps<TData = unknown>(
    {queries, options, config}: FetchParams
): UseQueryResult<TData, HttpResponseError> {
    const fetchData = useQueryFnHandler({
        errorMessage: "Failed to fetch seat map. Please try again.",
        action: () => SeatMapRepository.query({queries, config}),
    });

    return useQuery({
        queryKey: ["seat_maps", "lists", "query", {...queries, ...config}],
        queryFn: fetchData,
        ...useQueryOptionDefaults(options),
    });
}
