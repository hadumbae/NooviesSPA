/**
 * @fileoverview Defines the administrative API service for fetching granular
 * movie review data, including the author's identity and review details.
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCode} from "@/domains/review/features/codes"
import RequestReturns from "@/common/type/request/RequestReturns.ts"
import {CustomerReviewViewData} from "@/domains/customers/features/movie-review/viewDataSchema.ts"
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts"
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts"

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`

/** Configuration parameters for fetching a granular view of a specific movie review. */
export type GetFetchCustomerReviewViewDataConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
}

/**
 * Fetches detailed review and author data for a specific movie review from the
 * administrative view API.
 */
export const getFetchCustomerReviewViewData = (
    {customerCode, reviewCode}: GetFetchCustomerReviewViewDataConfig
): Promise<RequestReturns<CustomerReviewViewData>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/review/${reviewCode}`,
    })

    return useFetchAPI<CustomerReviewViewData>({method: "GET", url})
}