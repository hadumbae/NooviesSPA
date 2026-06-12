/**
 * @fileoverview TanStack Query hook for fetching administrative customer review detail views.
 *
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {MovieReviewUniqueCode} from "@/domains/movieReviews/schemas/fields";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {CustomerReviewViewQueryKeys} from "@/domains/customers/_feat/movie-review/fetch/queryKeys.ts";
import {
    CustomerReviewViewData,
    CustomerReviewViewSchema
} from "@/domains/customers/_feat/movie-review/schema/viewDataSchema.ts";
import {getFetchCustomerReviewViewData} from "@/domains/customers/_feat/movie-review/repository/repository.ts";

/** Parameters for the customer review data fetch hook. */
export type FetchParams = {
    customerCode: UserUniqueCode;
    reviewCode: MovieReviewUniqueCode;
    options?: FetchQueryOptions<CustomerReviewViewData>;
};

/** Fetches and validates hydrated review and author data for administrative moderation. */
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