/**
 * @file React Query hook for fetching paginated reservations for the authenticated user.
 * @filename useFetchReservationsForCurrentUser.ts
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import {ReservationUtilityRepository} from "@/domains/reservation/repositories/ReservationUtilityRepository.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Input parameters for {@link useFetchReservationsForCurrentUser}.
 */
type FetchParams = {
    /** {@link PaginationValues} specifying page and record limit. */
    pagination: PaginationValues;

    /** * Optional React Query configuration overrides.
     * @see UseQueryOptions
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * Custom hook to retrieve a paginated list of reservations belonging to the current user.
 * * * **Data Source:** {@link ReservationUtilityRepository.fetchUserReservations}.
 * * **Error Handling:** Wrapped in {@link useQueryFnHandler} for standardized toast/logging.
 * * **Caching:** Query key is strictly tied to pagination state for automatic refetching on page change.
 * * @param params - Object containing {@link pagination} and optional {@link options}.
 * @returns Standard TanStack {@link useQuery} result.
 */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, options}: FetchParams
) {
    /** * Higher-order function handling the async action and
     * potential UI-level error side effects.
     */
    const fetchReservations = useQueryFnHandler({
        action: () => ReservationUtilityRepository.fetchUserReservations({page, perPage}),
        errorMessage: "Failed to fetch current authenticated user's reservations.",
    });

    return useQuery({
        /** * Hierarchical query key for granular cache invalidation.
         * Updates whenever {page, perPage} changes.
         */
        queryKey: ["reservations", "lists", "current-user", {page, perPage}],
        queryFn: fetchReservations,
        ...useQueryOptionDefaults(options),
    });
}