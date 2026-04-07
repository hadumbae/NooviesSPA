/**
 * @file Repository for retrieving administrative customer profile and review data.
 * @filename repository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    GetFetchCustomerProfileViewData,
    GetFetchCustomerReviewViewDataConfig
} from "@/domains/customers/features/data/repository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

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
    {customerCode}: GetFetchCustomerProfileViewData
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}`,
    });

    return useFetchAPI({method: "GET", url});
}

/**
 * Fetches detailed review and author data for a specific movie review.
 * ---
 * @param params - Composite keys for both the customer and the specific review.
 * @returns {Promise<RequestReturns<unknown>>} The wrapped hydrated review context.
 */
export const getFetchCustomerReviewViewData = (
    {customerCode, reviewCode}: GetFetchCustomerReviewViewDataConfig
): Promise<RequestReturns<unknown>> => {
    const url = buildQueryURL({
        baseURL,
        path: `profile-details/${customerCode}/review/${reviewCode}`,
    });

    return useFetchAPI({method: "GET", url});
}