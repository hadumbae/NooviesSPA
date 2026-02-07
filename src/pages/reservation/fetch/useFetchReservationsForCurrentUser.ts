/**
 * @file useFetchReservationsForCurrentUser.ts
 *
 * React Query hook for fetching paginated reservations
 * belonging to the currently authenticated user.
 *
 * Wraps `ReservationUtilityRepository.fetchUserReservations`
 * with a standardized query function handler and
 * applies default React Query options.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import {ReservationUtilityRepository} from "@/pages/reservation/repositories/ReservationUtilityRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

type FetchParams = {
    /** Pagination configuration for the reservation list */
    pagination: PaginationValues;

    /** Optional React Query overrides (enabled, staleTime, etc.) */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches reservations for the current user with pagination support.
 *
 * Uses a shared query function handler to ensure consistent
 * error handling and response normalization.
 *
 * @param pagination - Page and per-page values
 * @param options - Optional React Query configuration
 *
 * @returns React Query result for the reservation list request
 */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, options}: FetchParams
) {
    const fetchReservations = useQueryFnHandler({
        action: () =>
            ReservationUtilityRepository.fetchUserReservations({page, perPage}),
    });

    return useQuery({
        queryKey: ["reservations", "lists", "current-user"],
        queryFn: fetchReservations,
        ...useQueryOptionDefaults(options),
    });
}
