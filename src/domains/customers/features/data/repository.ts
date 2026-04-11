/**
 * @file Repository for retrieving administrative customer profile and review data.
 * @filename repository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    GetFetchCustomerProfileViewDataConfig, GetFetchCustomerReviewsViewDataConfig,
    GetFetchCustomerReviewViewDataConfig
} from "@/domains/customers/features/data/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {CustomerReviewViewData} from "@/domains/customers/features/movie-review/schemas";
import {CustomerReviewsViewData} from "@/domains/customers/features/movie-reviews/schemas";

/**
 * Base endpoint for administrative customer view data aggregation.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`;

/**
 * Fetches the 360-degree profile view for a specific customer.
 * ---
 * @param params - Identity configuration for the target customer.
 * @returns {Promise<RequestReturns<unknown>>} The wrapped aggregated profile payload.
 */
export const getFetchCustomerProfileViewData = (
    {customerCode}: GetFetchCustomerProfileViewDataConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}`,
    });

    return useFetchAPI({method: "GET", url});
}

/**
 * Fetches a paginated collection of reviews authored by a specific customer.
 * ---
 * @param params - Identity and pagination parameters.
 * @returns {Promise<RequestReturns<CustomerReviewsViewData>>} The wrapped paginated reviews payload.
 */
export const getFetchCustomerReviewsViewData = (
    {customerCode, pagination}: GetFetchCustomerReviewsViewDataConfig
): Promise<RequestReturns<CustomerReviewsViewData>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/reviews`,
        queries: pagination
    });

    return useFetchAPI<CustomerReviewsViewData>({method: "GET", url});
}

/**
 * Fetches detailed review and author data for a specific movie review.
 * ---
 * @param params - Composite keys for both the customer and the specific review.
 * @returns {Promise<RequestReturns<CustomerReviewViewData>>} The wrapped hydrated review context.
 */
export const getFetchCustomerReviewViewData = (
    {customerCode, reviewCode}: GetFetchCustomerReviewViewDataConfig
): Promise<RequestReturns<CustomerReviewViewData>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/review/${reviewCode}`,
    });

    return useFetchAPI<CustomerReviewViewData>({method: "GET", url});
}