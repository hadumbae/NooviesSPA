/**
 * # useFetchSeatMaps Hook
 *
 * A React Query hook for fetching seat maps from the backend using
 * configurable query options.
 * Supports filtering, sorting, and standard request options, while providing
 * strongly typed results and errors.
 *
 * This hook integrates:
 * - **SeatMapRepository** — performs the actual API query.
 * - **useQueryFnHandler** — wraps the repository call with error handling.
 * - **React Query (`useQuery`)** — manages caching, re-fetching, and data state.
 *
 * ## Features
 * - Type-safe query parameters (`SeatMapQueryOptions`).
 * - Configurable request options and React Query behavior.
 * - Automatic error handling with `HttpResponseError`.
 * - Default query options applied via `useQueryOptionDefaults`.
 *
 * ## Related Types
 * - **FetchQueryParams** — The parameter object shape for this hook.
 * - **UseQueryResult** — Returned type of React Query, typed to `TData`.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchByQueryHookParams} from "@/common/type/query/FetchHookParams.ts";
import {SeatMapQueryOptions} from "@/pages/seatmap/schema/query-options/SeatMapQueryOptions.ts";

/**
 * ## FetchQueryParams
 *
 * Type alias for the parameter object accepted by `useFetchSeatMaps`.
 * Combines:
 * - `SeatMapQueryOptions` — query filters and sorting options for seat maps.
 * - `RequestOptions` & `UseQueryOptions<TData>` from `FetchByQueryHookParams`.
 *
 * @template TData
 * The expected return type of the hook's query (defaults to `unknown`).
 *
 * @example
 * const params: FetchQueryParams<SeatMap[]> = {
 *   url: "/api/seat-maps",
 *   method: "GET",
 *   queries: {
 *     status: "AVAILABLE",
 *     sortByPrice: 1
 *   },
 *   options: {
 *     enabled: true,
 *     staleTime: 30000
 *   }
 * };
 */
type FetchQueryParams<TData> = FetchByQueryHookParams<SeatMapQueryOptions, TData>;

/**
 * ## useFetchSeatMaps
 *
 * React Query hook for fetching seat map data from the API.
 *
 * @template TData
 * The expected type of the fetched data. Defaults to `unknown`.
 *
 * @param params
 * An object containing:
 * - `queries` — Seat map filter and sort options.
 * - `options` — React Query configuration.
 * - Other `RequestOptions` (e.g., URL, method, headers).
 *
 * @returns
 * A `UseQueryResult<TData, HttpResponseError>` object from React Query,
 * including status flags (`isLoading`, `isError`, `data`, etc.) and error handling.
 *
 * @example
 * const { data, isLoading, error } = useFetchSeatMaps<SeatMap[]>({
 *   url: "/api/seat-maps",
 *   method: "GET",
 *   queries: {
 *     status: "AVAILABLE",
 *     sortBySeatRow: 1
 *   },
 *   options: {
 *     enabled: true,
 *     staleTime: 15000
 *   }
 * });
 */
export default function useFetchSeatMaps<TData = unknown>(
    params: FetchQueryParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const {queries = {}, options = useQueryOptionDefaults(), ...requestOptions} = params;

    const queryKey = ["fetch_seat_maps_by_query", {queries, options: requestOptions}];

    const fetchData = useQueryFnHandler({
        action: () => SeatMapRepository.query({queries: {...queries, ...requestOptions}}),
        errorMessage: "Failed to fetch seat map. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchData,
        ...options,
    });
}
