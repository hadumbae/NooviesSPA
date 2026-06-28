/**
 * @fileoverview Repository for retrieving paginated reservation history for the current client.
 *
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {PaginatedItems} from "@/common/types";
import {PopulatedReservation} from "@/domains/reservation/_schema";
import {buildURL} from "@/common/_feat/fetch-api";
import {FetchClientReservationsBaseURL} from "@/domains/reservation/_feat";

/**
 * Fetches a paginated collection of reservations belonging to the authenticated user.
 */
export const getFetchUserReservations = async (
    {page, perPage}: PaginationValues = {page: 1, perPage: 20}
): Promise<RequestReturns<PaginatedItems<PopulatedReservation>>> => {
    const url = buildURL({
        baseURL: FetchClientReservationsBaseURL,
        path: "/user/paginated",
        queries: {page, perPage},
    });

    return useFetchAPI({method: "GET", url});
};