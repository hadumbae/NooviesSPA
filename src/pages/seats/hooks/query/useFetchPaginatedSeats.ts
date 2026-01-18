/**
 * @file useFetchPaginatedSeats.ts
 *
 * React Query hook for fetching a paginated list of seats.
 * Combines pagination parameters with seat query filters and
 * standardized request / error handling.
 */

import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {SeatQueryOptions} from "@/pages/seats/schema/queries/SeatQueryOptions.ts";

/**
 * Parameters for {@link useFetchPaginatedSeats}.
 */
type FetchParams = PaginationValues & {
    /**
     * Seat query filters (e.g. theatre, screen, availability).
     */
    queries?: SeatQueryOptions;

    /**
     * Request-level configuration such as sorting or population options.
     */
    config?: RequestOptions;

    /**
     * React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * # useFetchPaginatedSeats Hook
 *
 * Fetches a paginated collection of seats using page-based pagination.
 *
 * Integrates:
 * - **SeatRepository.paginated** for backend pagination
 * - **useQueryFnHandler** for consistent error handling
 * - **useQueryOptionDefaults** for shared React Query defaults
 *
 * @param params
 * Pagination values, optional seat filters, request configuration,
 * and React Query options.
 *
 * @returns
 * React Query result containing paginated seat data or an
 * {@link HttpResponseError}.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchPaginatedSeats({
 *   page: 1,
 *   perPage: 20,
 *   queries: { screen: "screen-1" },
 * });
 * ```
 */
export default function useFetchPaginatedSeats(
    {page, perPage, queries, config, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    const queryKey = [
        "seats", "lists", "paginated",
        {page, perPage, ...queries, ...config},
    ];

    const fetchSeats = useQueryFnHandler({
        action: () => SeatRepository.paginated({page, perPage, queries, config}),
        errorMessage: "Failed to fetch seats. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: fetchSeats,
        ...useQueryOptionDefaults(options),
    });
}
