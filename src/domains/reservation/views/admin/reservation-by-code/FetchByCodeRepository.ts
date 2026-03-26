/**
 * @file Data repository for administrative reservation retrieval by unique code.
 * @filename FetchByCodeRepository.ts
 */

import {
    GetFetchByCodeParams
} from "@/domains/reservation/views/admin/reservation-by-code/FetchByCodeRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * The base URL for administrative reservation feature endpoints.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/reservations/feat`;

/**
 * Dispatches an authenticated GET request to resolve a reservation via its verification code.
 * @param `code` - the reservation's unique code (e.g., "RES-K9P2W-LM4X1").
 * @returns A standardized response containing the reservation record.
 */
export const getFetchByCode = (
    {code}: GetFetchByCodeParams
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `fetch-by-code/${code}`
    });

    return useFetchAPI({method: "GET", url});
}