/**
 * @file useFetchPaginatedSeatMaps.ts
 *
 * React Query hook for fetching paginated seat map data.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery} from "@tanstack/react-query";
import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOptions.ts";
import {FetchByQueryParams} from "@/common/type/query/FetchByQueryParams.ts";

/**
 * Parameters for `useFetchPaginatedSeatMaps`.
 *
 * Combines pagination values with query filters and React Query options.
 *
 * @template TData - Returned data shape.
 */
type FetchParams<TData = unknown> =
    PaginationValues &
    FetchByQueryParams<SeatMapQueryOptions, TData>;

/**
 * Fetch paginated seat maps using React Query.
 *
 * @template TData - Returned data shape.
 *
 * @param params - Pagination, query filters, request config, and query options.
 * @returns React Query result for the paginated seat map request.
 */
export default function useFetchPaginatedSeatMaps<TData = unknown>(
    params: FetchParams<TData>
) {
    const {page, perPage, queries, queryConfig, queryOptions} = params;

    const fetchSeatMap = useQueryFnHandler({
        errorMessage: "Failed to fetch seat maps. Please try again.",
        action: () =>
            SeatMapRepository.paginated({
                page,
                perPage,
                queries,
                config: queryConfig,
            }),
    });

    return useQuery({
        queryKey: ["fetch_paginated_seat_maps_by_query"],
        queryFn: fetchSeatMap,
        ...useQueryOptionDefaults(queryOptions),
    });
}
