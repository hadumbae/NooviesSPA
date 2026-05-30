/**
 * @fileoverview Data repository for administrative reservation retrieval by unique code.
 */

import {
    GetFetchByCodeParams
} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories/repository.types.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/**
 * The base URL for administrative reservation feature endpoints.
 */
const baseURL = `/api/v1/admin/reservations/feat`;

/** Dispatches an authenticated GET request to resolve a reservation via its verification code. */
export const getFetchByCode = (
    {code}: GetFetchByCodeParams
): Promise<RequestReturns<unknown>> => {
    const url = buildURL({
        baseURL,
        path: `/fetch-by-code/${code}`
    });

    return useFetchAPI({method: "GET", url});
}