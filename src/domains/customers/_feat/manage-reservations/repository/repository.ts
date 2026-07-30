/**
 * @fileoverview Repository for fetching paginated movie reservations authored by a specific customer.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts"
import {buildURL} from "@/common/_feat/fetch-api";
import {CustomerReservationsViewData} from "@/domains/customers/_feat/manage-reservations/schema"
import {
    ManageCustomerReservationsBaseURL
} from "@/domains/customers/_feat/manage-reservations/repository/baseURL.ts";
import {
    GetFetchCustomerReservationsViewDataConfig
} from "@/domains/customers/_feat/manage-reservations/repository/repository.types.ts";

/**
 * Fetches a paginated collection of reservations authored by a specific customer.
 */
export function getFetchCustomerReservationsViewData(
    {customerID, pagination}: GetFetchCustomerReservationsViewDataConfig
): Promise<FetchRequestReturns<CustomerReservationsViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerReservationsBaseURL,
        path: `/customer/${customerID}/reservations`,
        queries: pagination
    });

    return useFetchAPI<CustomerReservationsViewData>({method: "GET", url})
}