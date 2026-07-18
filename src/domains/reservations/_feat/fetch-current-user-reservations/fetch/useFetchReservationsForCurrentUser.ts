/**
 * @fileoverview Hook for fetching paginated reservations for the authenticated user.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservations/_schema";
import {PaginatedItems} from "@/common/_types";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {getFetchUserReservations} from "@/domains/reservations/_feat/fetch-current-user-reservations/repository";
import {
    CurrentUserReservationQueryKeys
} from "@/domains/reservations/_feat/fetch-current-user-reservations/keys";
import {
    CurrentUserReservationsQueryOptions
} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";

type CurrentUserReservations = PaginatedItems<PopulatedReservation>;

/** Parameters for the useFetchReservationsForCurrentUser hook. */
type FetchParams = {
    pagination: PaginationValues;
    queries?: CurrentUserReservationsQueryOptions;
    options?: FetchQueryOptions<CurrentUserReservations>;
};

/** Fetches a paginated list of reservations belonging to the authenticated user. */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, queries, options}: FetchParams
): UseQueryResult<CurrentUserReservations, HttpResponseError> {
    const fetchReservations = buildQueryFn<CurrentUserReservations>({
        action: () => getFetchUserReservations({page, perPage, queries}),
        schema: generatePaginationSchema(PopulatedReservationSchema),
    });

    return useQuery({
        queryKey: CurrentUserReservationQueryKeys.currentUser({page, perPage, ...queries}),
        queryFn: fetchReservations,
        ...useQueryOptionDefaults(options),
    });
}