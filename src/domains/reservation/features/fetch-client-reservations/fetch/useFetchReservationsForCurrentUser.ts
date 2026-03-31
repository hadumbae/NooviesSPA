/**
 * @file React Query hook for fetching paginated reservations for the authenticated user.
 * @filename useFetchReservationsForCurrentUser.ts
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchUserReservations} from "@/domains/reservation/features/fetch-client-reservations/repositories";

/**
 * Input parameters for {@link useFetchReservationsForCurrentUser}.
 */
type FetchParams = {
    /** {@link PaginationValues} specifying page and record limit. */
    pagination: PaginationValues;

    /**
     * Optional React Query configuration overrides.
     */
    options?: UseQueryOptions<unknown>;
};

/**
 * Custom hook to retrieve a paginated list of reservations belonging to the current user.
 * @param params - Object containing {@link pagination} and optional {@link options}.
 * @returns Standard TanStack {@link useQuery} result.
 */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, options}: FetchParams
) {
    const fetchReservations = useQueryFnHandler({
        action: () => getFetchUserReservations({page, perPage}),
        errorMessage: "Failed to fetch current authenticated user's reservations.",
    });

    return useQuery({
        queryKey: ["reservations", "lists", "current-user", {page, perPage}],
        queryFn: fetchReservations,
        ...useQueryOptionDefaults(options),
    });
}