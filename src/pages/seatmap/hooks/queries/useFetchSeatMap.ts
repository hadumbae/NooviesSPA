/**
 * # useFetchSeatMap Hook
 *
 * A React Query hook for fetching a single seat map by its ObjectId.
 *
 * Integrates:
 * - **SeatMapRepository.get** — performs the API call to fetch the seat map.
 * - **useQueryFnHandler** — wraps the repository call with consistent error handling.
 * - **React Query (`useQuery`)** — manages caching, re-fetching, and state.
 *
 * Supports passing generic `TData` for strongly typing the fetched data and
 * configurable React Query options.
 */

import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * ## FetchParams
 *
 * Parameters accepted by `useFetchSeatMap`.
 *
 * Combines:
 * - `_id` from `FetchByIDParams` — the ObjectId of the seat map to fetch.
 * - Generic `UseQueryOptions<TData>` — React Query options for controlling
 *   caching, refetching, and stale state.
 *
 * @template TData
 * The type of the data returned by the hook. Defaults to `unknown`.
 *
 * @example
 * ```ts
 * const params: FetchParams<SeatMap> = {
 *   _id: "6530a8121e4f09c92f123abc",
 *   options: {
 *     enabled: true,
 *     staleTime: 10000
 *   }
 * };
 * ```
 */
type FetchParams<TData> = FetchByIDParams & {
    /** React Query configuration options for the hook. */
    options: UseQueryOptions<TData>;
};

/**
 * ## useFetchSeatMap
 *
 * Hook for fetching a single seat map by its ObjectId.
 *
 * @template TData
 * The type of the returned seat map data. Defaults to `unknown`.
 *
 * @param params - The fetch parameters including `_id` and query options.
 *
 * @returns A `UseQueryResult<TData>` object from React Query,
 * containing the fetched data, loading state, and error state.
 *
 * @example
 * ```ts
 * const { data, isLoading, error } = useFetchSeatMap<SeatMap>({
 *   _id: "6530a8121e4f09c92f123abc",
 *   options: {
 *     enabled: true,
 *     staleTime: 15000
 *   }
 * });
 * ```
 */
export default function useFetchSeatMap<TData = unknown>(params: FetchParams<TData>) {
    const {_id, options = useQueryOptionDefaults(), ...requestOptions} = params;

    const queryKey = ["fetch_single_seat_map", {_id, options, requestOptions}];

    const fetchSeatMap = useQueryFnHandler({
        action: () => SeatMapRepository.get({_id, ...requestOptions}),
        errorMessage: "Failed to fetch seat map data. Please try again."
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeatMap,
        ...options,
    });
}
