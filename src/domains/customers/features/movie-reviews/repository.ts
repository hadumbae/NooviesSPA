/**
 * @fileoverview Defines the administrative API service for fetching a
 * paginated collection of movie reviews authored by a specific customer.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts"
import {CustomerReviewsViewData} from "@/domains/customers/features/movie-reviews/viewDataSchema.ts"
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts"
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {PaginationValues} from "@/common/features/fetch-pagination-search-params"

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`

/** Configuration for fetching a paginated list of reviews by a customer. */
export type GetFetchCustomerReviewsViewDataConfig = {
    customerCode: UserUniqueCode
    pagination: PaginationValues
}

/**
 * Fetches a paginated collection of reviews authored by a specific customer from
 * the administrative view API.
 */
export function getFetchCustomerReviewsViewData(
    {customerCode, pagination}: GetFetchCustomerReviewsViewDataConfig
): Promise<RequestReturns<CustomerReviewsViewData>> {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/reviews`,
        queries: pagination
    })

    return useFetchAPI<CustomerReviewsViewData>({method: "GET", url})
}