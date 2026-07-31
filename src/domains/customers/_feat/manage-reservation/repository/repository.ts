/**
 * @fileoverview Data retrieval functions for customer movie reservation view data.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts"
import {buildURL} from "@/common/_feat/fetch-api";
import {CustomerReservationViewData} from "@/domains/customers/_feat/manage-reservation/schema/viewDataSchema.ts"
import {ManageCustomerReservationBaseURL} from "@/domains/customers/_feat/manage-reservation/repository/baseURL.ts";
import {
    GetFetchCustomerReservationViewDataConfig
} from "@/domains/customers/_feat/manage-reservation/repository/repository.types";

/**
 * Retrieves the composite view data for a specific customer reservation.
 */
export function getFetchCustomerReservationViewData(
    {customerID, reservationID}: GetFetchCustomerReservationViewDataConfig
): Promise<FetchRequestReturns<CustomerReservationViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerReservationBaseURL,
        path: `/customer/${customerID}/reservations/${reservationID}`,
    });

    return useFetchAPI<CustomerReservationViewData>({method: "GET", url});
}