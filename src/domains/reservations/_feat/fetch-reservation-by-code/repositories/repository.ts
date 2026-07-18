/**
 * @fileoverview Data repository for administrative reservation retrieval by unique code.
 */

import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {FetchByCodeData} from "@/domains/reservations/_feat/fetch-reservation-by-code/schemas";
import {
    GetFetchByCodeParams,
    FetchReservationByCodeBaseURL
} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories";

/** Dispatches an authenticated GET request to resolve a reservation via its verification code. */
export const getFetchByCode = (
    {code}: GetFetchByCodeParams
): Promise<FetchRequestReturns<FetchByCodeData>> => {
    const url = buildURL({
        baseURL: FetchReservationByCodeBaseURL,
        path: `/fetch-by-code/${code}`,
    });

    return useFetchAPI({method: "GET", url});
}