/**
 * @fileoverview Repository for fetching customer profile data for administrative views.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts"
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts"
import {CustomerProfileOverviewBaseURL} from "@/domains/customers/_feat/profile-overview/repository/baseURL";
import {
    GetFetchCustomerProfileViewDataConfig
} from "@/domains/customers/_feat/profile-overview/repository/repository.types";
import {buildURL} from "@/common/_feat/fetch-api";
import {CustomerProfileViewData} from "@/domains/customers";

/**
 * Fetches the complete profile view for a specific customer.
 */
export function getFetchCustomerProfileViewData(
    {customerCode}: GetFetchCustomerProfileViewDataConfig
): Promise<RequestReturns<CustomerProfileViewData>> {
    const url = buildURL({
        baseURL: CustomerProfileOverviewBaseURL,
        path: `/profile-details/${customerCode}`,
    })

    return useFetchAPI({method: "GET", url})
}