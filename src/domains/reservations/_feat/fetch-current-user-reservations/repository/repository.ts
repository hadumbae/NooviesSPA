/**
 * @fileoverview Repository for retrieving paginated reservation history for the current client.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {PaginatedItems} from "@/common/types";
import {PopulatedReservation} from "@/domains/reservations/_schema";
import {buildURL} from "@/common/_feat/fetch-api";
import {
    FetchClientReservationsBaseURL
} from "@/domains/reservations/_feat//fetch-current-user-reservations/repository/baseURL";
import {
    GetFetchUserReservationsConfig
} from "@/domains/reservations/_feat/fetch-current-user-reservations/repository/repository.types.ts";

/**
 * Fetches a paginated collection of reservations belonging to the authenticated user.
 */
export const getFetchUserReservations = async (
    {page, perPage, queries}: GetFetchUserReservationsConfig = {page: 1, perPage: 20}
): Promise<RequestReturns<PaginatedItems<PopulatedReservation>>> => {
    const url = buildURL({
        baseURL: FetchClientReservationsBaseURL,
        path: "/user/paginated",
        queries: {page, perPage, ...queries},
    });

    return useFetchAPI({method: "GET", url});
};