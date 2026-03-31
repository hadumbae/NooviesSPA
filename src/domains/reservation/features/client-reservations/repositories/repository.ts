/**
 * @file API repository for retrieving paginated reservation history for the current client.
 * @filename repository.ts
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Root endpoint for the client-facing reservation retrieval feature.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/feat/fetch-client-reservations`;

/**
 * Fetches a paginated collection of reservations belonging to the authenticated user.
 * @param pagination - Configuration for data windowing, including `page` and `perPage` limits.
 * @returns A promise resolving to a standardized {@link RequestReturns} object containing the items and metadata.
 */
export const getFetchUserReservations = async (
    {page, perPage}: PaginationValues = {page: 1, perPage: 20}
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL,
        path: "user/paginated",
        queries: {page, perPage},
    });

    return useFetchAPI({method: "GET", url});
};