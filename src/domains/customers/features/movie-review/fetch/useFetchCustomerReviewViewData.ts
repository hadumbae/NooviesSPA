/**
 * @file TanStack Query hook for fetching administrative customer review detail views.
 * @filename useFetchCustomerReviewViewData.ts
 */

import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {CustomerViewQueryKeys, getFetchCustomerReviewViewData} from "@/domains/customers/features/data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";

/**
 * Configuration for the customer review data fetch.
 */
type FetchParams = {
    /** The validated unique code of the customer who authored the review. */
    customerCode: UserUniqueCode;
    /** The validated unique code of the specific review to be retrieved. */
    reviewCode: MovieReviewUniqueCode;
    /** Standard TanStack Query options for caching and staleness logic. */
    options?: UseQueryOptions<unknown>;
}

/**
 * Hook to retrieve hydrated review and author data for administrative moderation.
 * ---
 * @param params - Identity codes and optional query configuration.
 * @returns {UseQueryResult} The query state, data, and error status.
 */
export function useFetchCustomerReviewViewData(
    {customerCode, reviewCode, options}: FetchParams
): UseQueryResult<unknown, HttpResponseError> {
    /** Standardize the fetching logic and error messaging */
    const fetchDetails = useQueryFnHandler({
        action: () => getFetchCustomerReviewViewData({customerCode, reviewCode}),
        errorMessage: "Failed to fetch customer review details. Please try again.",
    });

    return useQuery({
        /** Hierarchical key ensures granular cache invalidation */
        queryKey: CustomerViewQueryKeys.review({customerCode, reviewCode}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}