/**
 * @fileoverview Defines the administrative API service for fetching a
 * comprehensive profile view of a customer, including identity and activity.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts"
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts"
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`

/** Parameters for fetching a high-level overview of a customer's profile activity. */
export type GetFetchCustomerProfileViewDataConfig = {
    /** The validated unique code of the customer whose profile is being requested. */
    customerCode: UserUniqueCode
}

/**
 * Fetches the 360-degree profile view for a specific customer from the
 * administrative view API.
 */
export function getFetchCustomerProfileViewData(
    {customerCode}: GetFetchCustomerProfileViewDataConfig
): Promise<RequestReturns<unknown>> {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}`,
    })

    return useFetchAPI({method: "GET", url})
}