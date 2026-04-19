/**
 * @file TanStack Query hook for fetching administrative customer review detail views.
 * @filename useFetchCustomerReviewViewData.ts
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {MovieReviewUniqueCode} from "@/domains/review/features/codes";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {CustomerReviewViewQueryKeys} from "@/domains/customers/features/movie-review/queryKeys.ts";
import {
    CustomerReviewViewData,
    CustomerReviewViewSchema
} from "@/domains/customers/features/movie-review/viewDataSchema.ts";
import {getFetchCustomerReviewViewData} from "@/domains/customers/features/movie-review/repository.ts";

/**
 * Configuration for the customer review data fetch.
 */
type FetchParams = {
    /** The validated unique code of the customer who authored the review. */
    customerCode: UserUniqueCode;
    /** The validated unique code of the specific review to be retrieved. */
    reviewCode: MovieReviewUniqueCode;
    /** Standard TanStack Query options for caching and staleness logic. */
    options?: FetchQueryOptions<CustomerReviewViewData>;
}

/**
 * Hook to retrieve hydrated review and author data for administrative moderation.
 * ---
 * @param params - Identity codes and optional query configuration.
 * @returns {UseQueryResult<CustomerReviewViewData, HttpResponseError>} The validated query state.
 */
export function useFetchCustomerReviewViewData(
    {customerCode, reviewCode, options}: FetchParams
): UseQueryResult<CustomerReviewViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        action: () => getFetchCustomerReviewViewData({customerCode, reviewCode}),
        schema: CustomerReviewViewSchema,
    });

    return useQuery({
        queryKey: CustomerReviewViewQueryKeys.review({customerCode, reviewCode}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}