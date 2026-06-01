/**
 * @fileoverview Hook for fetching and validating movie review moderation logs.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query"
import HttpResponseError from "@/common/errors/HttpResponseError.ts"
import {buildQueryFn} from "@/common/_feat/validate-fetch-data"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params"
import {MovieReviewUniqueCode} from "@/domains/movieReviews/schemas/fields"
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts"
import {CustomerReviewLogsQueryKeys} from "@/domains/customers/_feat/movie-review-logs/fetch/queryKeys.ts"
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts"
import {
    getFetchCustomerReviewLogsViewData
} from "@/domains/customers/_feat/movie-review-logs/repository/repository.ts";
import {
    CustomerReviewLogsViewData,
    CustomerReviewLogsViewDataSchema
} from "@/domains/customers/_feat/movie-review-logs/schema/viewDataSchema.ts";

/** Configuration for the customer review logs fetch hook. */
type FetchConfig = {
    customerCode: UserUniqueCode
    reviewCode: MovieReviewUniqueCode
    pagination: PaginationValues
    options?: FetchQueryOptions<CustomerReviewLogsViewData>
}

/**
 * Fetches and validates paginated moderation logs for a specific customer review.
 */
export function useFetchCustomerReviewLogsViewData(
    {customerCode, reviewCode, pagination, options}: FetchConfig
): UseQueryResult<CustomerReviewLogsViewData, HttpResponseError> {
    const fetchLogs = buildQueryFn({
        schema: CustomerReviewLogsViewDataSchema,
        action: () => getFetchCustomerReviewLogsViewData({customerCode, reviewCode, pagination}),
    });

    return useQuery({
        queryKey: CustomerReviewLogsQueryKeys.reviewLogs({customerCode, reviewCode, ...pagination}),
        queryFn: fetchLogs,
        ...useQueryOptionDefaults(options),
    })
}