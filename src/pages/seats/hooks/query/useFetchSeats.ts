/**
 * @file useFetchSeats.ts
 *
 * @summary React Query hook for fetching paginated seat data from the backend.
 *
 * @description
 * Provides a convenient hook to query seat documents with support for:
 * - Pagination (`page`, `limit`)
 * - Filtering (seat-specific fields like `row`, `seatType`, `theatre`, `screen`)
 * - Sorting and additional request options (`RequestOptions`)
 * - Integration with React Query for caching, background refetching, and state management
 *
 * Utilizes {@link SeatRepository.query} under the hood and wraps errors with {@link HttpResponseError}.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {SeatQueryOptions} from "@/pages/seats/schema/queries/SeatQueryOption.types.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions, RequestPaginationOptions} from "@/common/type/request/RequestOptions.ts";

type FetchParams<TData = unknown> = {
    /**
     * Queries to control the request:
     * - Filters (seat-specific) via {@link SeatQueryOptions}
     * - Pagination via {@link RequestPaginationOptions}
     * - Request options via {@link RequestOptions} (e.g., projection, population)
     */
    queries: RequestOptions & RequestPaginationOptions & SeatQueryOptions;

    /**
     * React Query options to customize caching and fetch behavior.
     */
    options?: UseQueryOptions<TData>;
};

/**
 * React Query hook for fetching a **paginated list of seats**.
 *
 * @template TData - Shape of the returned data (e.g., paginated seat results).
 *
 * @param params - Configuration object including query parameters and React Query options.
 *
 * @returns A {@link UseQueryResult} containing:
 * - `data`: The fetched seat data (`TData`)
 * - `isLoading`: Whether the request is in progress
 * - `isError` / `error`: {@link HttpResponseError} if the request failed
 * - Other React Query helpers (`refetch`, `isFetching`, etc.)
 *
 * @example
 * ```ts
 * type PaginatedSeats = {
 *   items: Array<{ _id: string; row: string; seatNumber: number }>;
 *   total: number;
 *   page: number;
 *   limit: number;
 * };
 *
 * const { data, isLoading, error } = useFetchSeats<PaginatedSeats>({
 *   queries: {
 *     page: 1,
 *     limit: 20,
 *     theatre: "abc123",
 *     screen: "xyz789",
 *   },
 *   options: {
 *     staleTime: 5 * 60 * 1000, // 5 minutes
 *   },
 * });
 * ```
 */
export default function useFetchSeats<TData = unknown>(
    params: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const { queries, options } = params;
    const queryKey = ["fetch_seats_by_query", queries];

    const {
        enabled = true,
        staleTime = 1000 * 60,
        placeholderData = (previousData: TData | undefined) => previousData,
        initialData,
    } = options || {};

    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.query({ queries }),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
        enabled,
        staleTime,
        initialData,
        placeholderData,
    });
}
