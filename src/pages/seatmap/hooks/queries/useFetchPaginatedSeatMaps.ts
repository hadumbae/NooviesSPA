/**
 * # useFetchPaginatedSeatMaps Hook
 *
 * A React Query hook for fetching paginated seat maps from the backend.
 * Supports filtering, pagination, and customizable React Query options.
 *
 * Integrates:
 * - **SeatMapRepository.query** — performs the paginated API query.
 * - **useQueryFnHandler** — wraps the repository call with consistent error handling.
 * - **React Query (`useQuery`)** — manages caching, re-fetching, and query state.
 *
 * ## Features
 * - Type-safe query parameters (`SeatMapQueryOptions`).
 * - Pagination support via `page` and `perPage`.
 * - Optional request-level options (`RequestOptions`).
 * - Configurable React Query behavior (`UseQueryOptions<TData>`).
 * - Automatic error handling with a standardized error message.
 */

import {FetchByQueryHookParams} from "@/common/type/query/FetchHookParams.ts";
import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOption.types.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";
import {useQuery} from "@tanstack/react-query";

/**
 * ## FetchParams
 *
 * Parameters accepted by `useFetchPaginatedSeatMaps`.
 *
 * Combines:
 * - `SeatMapQueryOptions` — optional query filters and sort options.
 * - `PaginationValues` — `page` and `perPage` values for pagination.
 * - `RequestOptions` & `UseQueryOptions<TData>` from `FetchByQueryHookParams`.
 *
 * @template TData
 * The type of data returned by the hook. Defaults to `unknown`.
 *
 * @example
 * const params: FetchParams<SeatMap[]> = {
 *   page: 1,
 *   perPage: 10,
 *   queries: { status: "AVAILABLE", sortByPrice: 1 },
 *   options: { enabled: true, staleTime: 30000 }
 * };
 */
type FetchParams<TData = unknown> = FetchByQueryHookParams<SeatMapQueryOptions, TData> & PaginationValues;

/**
 * ## useFetchPaginatedSeatMaps
 *
 * React Query hook for fetching paginated seat map data from the API.
 *
 * @template TData
 * The type of the returned seat map data. Defaults to `unknown`.
 *
 * @param params - The fetch parameters, including pagination, queries, request options, and React Query options.
 *
 * @returns A `UseQueryResult<TData>` object from React Query, containing:
 * - `data` — the fetched paginated seat maps
 * - `isLoading` / `isFetching` — loading state
 * - `isError` / `error` — error state
 * - other React Query result properties
 *
 * @example
 * const { data, isLoading, error } = useFetchPaginatedSeatMaps<SeatMap[]>({
 *   page: 1,
 *   perPage: 20,
 *   queries: { status: "AVAILABLE", sortBySeatRow: 1 },
 *   options: { enabled: true, staleTime: 15000 }
 * });
 */
export default function useFetchPaginatedSeatMaps<TData = unknown>(params: FetchParams<TData>) {
    const {page, perPage, queries = {}, options = useQueryOptionDefaults(), ...requestOptions} = params;
    const paginatedQueries: RequestPaginationOptions = {paginated: true, page, perPage};

    const queryKey = [
        "fetch_paginated_seat_maps_by_query",
        {page, perPage, queries, requestOptions, options}
    ];

    const fetchSeatMap = useQueryFnHandler({
        action: () => SeatMapRepository.query({queries: {...paginatedQueries, ...queries}}),
        errorMessage: "Failed to fetch seat maps. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeatMap,
        ...options,
    });
}
