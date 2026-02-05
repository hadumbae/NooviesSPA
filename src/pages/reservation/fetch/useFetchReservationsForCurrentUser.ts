/**
 * @file useFetchReservationsForCurrentUser.ts
 *
 * React Query hook for fetching paginated reservations
 * belonging to the currently authenticated user.
 *
 * Wraps `ReservationUtilityRepository.fetchUserReservations`
 * and applies standard query option defaults.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import {ReservationUtilityRepository} from "@/pages/reservation/repositories/ReservationUtilityRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

type FetchParams = {
    /** Pagination configuration for the reservation list */
    pagination: PaginationValues;

    /** Optional React Query overrides (enabled, staleTime, etc.) */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches reservations for the current user with pagination support.
 *
 * @param pagination - Page and per-page values
 * @param options - Optional React Query configuration
 *
 * @returns React Query result for the reservation list request
 */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, options}: FetchParams
) {
    return useQuery({
        queryKey: ["reservations", "lists", "current-user"],
        queryFn: () =>
            ReservationUtilityRepository.fetchUserReservations({page, perPage}),
        ...useQueryOptionDefaults(options),
    });
}
