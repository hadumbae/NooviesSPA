/**
 * @fileoverview Repository for fetching granular movie review and author identity data.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts"
import {CustomerReviewViewData} from "@/domains/customers/_feat/movie-review/schema/viewDataSchema.ts"
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts"
import {buildURL} from "@/common/_feat/fetch-api";
import {ManageCustomerMovieReviewBaseURL} from "@/domains/customers/_feat/movie-review";
import {GetFetchCustomerReviewViewDataConfig} from "@/domains/customers/_feat/movie-review/repository/repository.types";

/**
 * Fetches detailed review and author data for a specific movie review.
 */
export function getFetchCustomerReviewViewData(
    {customerCode, reviewCode}: GetFetchCustomerReviewViewDataConfig
): Promise<RequestReturns<CustomerReviewViewData>> {
    const url = buildURL({
        baseURL: ManageCustomerMovieReviewBaseURL,
        path: `/profile-details/${customerCode}/review/${reviewCode}`,
    });

    return useFetchAPI<CustomerReviewViewData>({method: "GET", url});
}