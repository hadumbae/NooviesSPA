/**
 * @fileoverview Hook for fetching and validating movie review moderation logs.
 */

import {ObjectId} from "@/common/_schemas";
import {useQuery, UseQueryResult} from "@tanstack/react-query"
import HttpResponseError from "@/common/_err/HttpResponseError.ts"
import {buildQueryFn} from "@/common/_feat/validate-fetch-data"
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params"
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts"
import {CustomerReviewLogsQueryKeys} from "@/domains/customers/_feat/movie-review-logs/fetch/queryKeys.ts"
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts"
import {getFetchCustomerReviewLogsViewData} from "@/domains/customers/_feat/movie-review-logs/repository/repository.ts";
import {
    CustomerReviewLogsViewData,
    CustomerReviewLogsViewDataSchema
} from "@/domains/customers/_feat/movie-review-logs/schema/viewDataSchema.ts";

/** Configuration for the customer review logs fetch hook. */
type FetchConfig = {
    customerID: ObjectId;
    reviewID: ObjectId;
    pagination: PaginationValues
    options?: FetchQueryOptions<CustomerReviewLogsViewData>
}

/**
 * Fetches and validates paginated moderation logs for a specific customer review.
 */
export function useFetchCustomerReviewLogsViewData(
    {customerID, reviewID, pagination, options}: FetchConfig
): UseQueryResult<CustomerReviewLogsViewData, HttpResponseError> {
    const fetchLogs = buildQueryFn({
        schema: CustomerReviewLogsViewDataSchema,
        action: () => getFetchCustomerReviewLogsViewData({customerID, reviewID, pagination}),
    });

    return useQuery({
        queryKey: CustomerReviewLogsQueryKeys.reviewLogs({customerID, reviewID, ...pagination}),
        queryFn: fetchLogs,
        ...useQueryOptionDefaults(options),
    })
}