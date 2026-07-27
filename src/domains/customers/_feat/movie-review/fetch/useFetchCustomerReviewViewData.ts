/**
 * @fileoverview TanStack Query hook for fetching administrative customer review detail views.
 *
 */

import {ObjectId} from "@/common/_schemas";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {CustomerReviewViewQueryKeys} from "@/domains/customers/_feat/movie-review/fetch/queryKeys.ts";
import {
    CustomerReviewViewData,
    CustomerReviewViewSchema
} from "@/domains/customers/_feat/movie-review/schema/viewDataSchema.ts";
import {getFetchCustomerReviewViewData} from "@/domains/customers/_feat/movie-review/repository/repository.ts";

/** Parameters for the customer review data fetch hook. */
export type FetchParams = {
    customerID: ObjectId;
    reviewID: ObjectId;
    options?: FetchQueryOptions<CustomerReviewViewData>;
};

/** Fetches and validates hydrated review and author data for administrative moderation. */
export function useFetchCustomerReviewViewData(
    {customerID, reviewID, options}: FetchParams
): UseQueryResult<CustomerReviewViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        action: () => getFetchCustomerReviewViewData({customerID, reviewID}),
        schema: CustomerReviewViewSchema,
    });

    return useQuery({
        queryKey: CustomerReviewViewQueryKeys.review({customerID, reviewID}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}