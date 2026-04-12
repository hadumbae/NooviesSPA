/**
 * @fileoverview Defines the API service function for fetching paginated
 * moderation logs for a specific customer review.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params"
import RequestReturns from "@/common/type/request/RequestReturns.ts"
import {MovieReviewUniqueCode} from "@/domains/review/features/codes"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts"
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts"
import {CustomerReviewLogsViewData} from "@/domains/customers/features/movie-review-logs/viewDataSchema.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`

/** Configuration for fetching customer review moderation logs. */
export type GetFetchCustomerReviewLogsViewDataConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
    pagination: PaginationValues
}

/**
 * Retrieves paginated moderation audit logs for a specific review from the
 * administrative API.
 */
export async function getFetchCustomerReviewLogsViewData(
    {customerCode, reviewCode, pagination}: GetFetchCustomerReviewLogsViewDataConfig
): Promise<RequestReturns<CustomerReviewLogsViewData>> {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/review/${reviewCode}/logs`,
        queries: pagination
    })

    return useFetchAPI({method: "GET", url})
}