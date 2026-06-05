/**
 * @fileoverview Hook for fetching paginated reservations for the authenticated user.
 *
 */
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchUserReservations} from "@/domains/reservation/_feat/fetch-client-reservations/repositories";
import {PopulatedReservation, PopulatedReservationSchema} from "@/domains/reservation/schema";
import {PaginatedItems} from "@/common/types";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";

type CurrentUserReservations = PaginatedItems<PopulatedReservation>;

/** Parameters for the useFetchReservationsForCurrentUser hook. */
type FetchParams = {
    pagination: PaginationValues;
    options?: FetchQueryOptions<CurrentUserReservations>;
};

/** Fetches a paginated list of reservations belonging to the authenticated user. */
export function useFetchReservationsForCurrentUser(
    {pagination: {page, perPage}, options}: FetchParams
): UseQueryResult<CurrentUserReservations, HttpResponseError> {
    const fetchReservations = buildQueryFn<CurrentUserReservations>({
        action: () => getFetchUserReservations({page, perPage}),
        schema: generatePaginationSchema(PopulatedReservationSchema),
    });

    return useQuery({
        queryKey: ["reservations", "lists", "current-user", {page, perPage}],
        queryFn: fetchReservations,
        ...useQueryOptionDefaults(options),
    });
}