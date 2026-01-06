/**
 * @file useFetchSeats.ts
 *
 * React Query hook for fetching a list of seats using query filters.
 * Supports flexible seat querying with standardized error handling
 * and shared React Query defaults.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SeatQueryOptions} from "@/pages/seats/schema/queries/SeatQueryOption.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for {@link useFetchSeats}.
 */
type FetchParams = {
    /**
     * Seat query filters (e.g. theatre, screen, row, status).
     */
    queries?: SeatQueryOptions;

    /**
     * Request-level configuration (pagination, sorting, includes, etc.).
     */
    config?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * # useFetchSeats Hook
 *
 * Fetches a collection of seats based on provided query options.
 *
 * Integrates:
 * - **SeatRepository** for backend querying
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query behavior
 *
 * @param params
 * Optional seat query filters, request configuration, and React Query options.
 *
 * @returns
 * React Query result containing a seat list or an {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchSeats({
 *   queries: { screen: "screen-1" },
 * });
 * ```
 */
export default function useFetchSeats(
    {queries, config, options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.query({queries, config}),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey: ["fetch_seats_by_query", {...queries, ...config}],
        queryFn: fetchSeats,
        ...useQueryOptionDefaults(options),
    });
}
