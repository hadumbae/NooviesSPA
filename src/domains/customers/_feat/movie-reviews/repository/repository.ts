/**
 * @fileoverview Repository for fetching paginated movie reviews authored by a specific customer.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts"
import {CustomerReviewsViewData} from "@/domains/customers/_feat/movie-reviews/schema/viewDataSchema.ts"
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts"
import {buildURL} from "@/common/_feat/fetch-api";
import {ManageCustomerMovieReviewsBaseURL} from "@/domains/customers/_feat/movie-reviews";
import {
    GetFetchCustomerReviewsViewDataConfig
} from "@/domains/customers/_feat/movie-reviews/repository/repository.types";

/**
 * Fetches a paginated collection of reviews authored by a specific customer.
 */
export function getFetchCustomerReviewsViewData(
    {customerCode, pagination}: GetFetchCustomerReviewsViewDataConfig
): Promise<FetchRequestReturns<CustomerReviewsViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerMovieReviewsBaseURL,
        path: `/profile-details/${customerCode}/reviews`,
        queries: pagination
    });

    return useFetchAPI<CustomerReviewsViewData>({method: "GET", url})
}