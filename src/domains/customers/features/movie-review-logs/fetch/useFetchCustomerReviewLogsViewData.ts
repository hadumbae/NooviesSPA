/**
 * @fileoverview Defines a custom React hook for fetching and validating movie
 * review moderation logs using TanStack Query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query"
import {
    CustomerReviewLogsViewData,
    CustomerReviewLogsViewDataSchema
} from "@/domains/customers/features/movie-review-logs/schemas"
import HttpResponseError from "@/common/errors/HttpResponseError.ts"
import {buildQueryFn} from "@/common/features/validate-fetch-data"
import {getFetchCustomerReviewLogsViewData} from "@/domains/customers/features/movie-review-logs/respositories"
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {PaginationValues} from "@/common/features/fetch-pagination-search-params"
import {MovieReviewUniqueCode} from "@/domains/review/features/codes"
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts"
import {CustomerReviewLogsQueryKeys} from "@/domains/customers/features/movie-review-logs/fetch/queryKeys.ts"
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts"

/** Configuration for the customer review logs fetch hook. */
type FetchConfig = {
    /** The unique identifier of the customer. */
    customerCode: UserUniqueCode
    /** The unique identifier of the review. */
    reviewCode: MovieReviewUniqueCode
    /** Pagination state including current page and per-page limit. */
    pagination: PaginationValues
    /** Optional TanStack Query configuration overrides. */
    options?: UseQueryOptions<CustomerReviewLogsViewData>
}

/**
 * Custom hook that fetches paginated moderation logs for a specific review.
 *
 * Performs runtime validation of the API response against the
 * CustomerReviewLogsViewDataSchema before returning the query result.
 */
export function useFetchCustomerReviewLogsViewData(
    {customerCode, reviewCode, pagination, options}: FetchConfig
): UseQueryResult<CustomerReviewLogsViewData, HttpResponseError> {
    const fetchLogs = buildQueryFn({
        schema: CustomerReviewLogsViewDataSchema,
        action: () => getFetchCustomerReviewLogsViewData({customerCode, reviewCode, pagination}),
    })

    return useQuery({
        queryKey: CustomerReviewLogsQueryKeys.reviewLogs({customerCode, reviewCode, ...pagination}),
        queryFn: fetchLogs,
        ...useQueryOptionDefaults(options),
    })
}