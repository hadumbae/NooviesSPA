/**
 * @fileoverview React Query hook for retrieving paginated movie reviews for a specific customer.
 */
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {
    CustomerReviewsViewData,
    CustomerReviewsViewDataSchema
} from "@/domains/customers/_feat/movie-reviews/schema/viewDataSchema.ts";
import {getFetchCustomerReviewsViewData} from "@/domains/customers/_feat/movie-reviews/repository/repository.ts";
import {CustomerReviewsViewQueryKeys} from "@/domains/customers/_feat/movie-reviews/fetch/queryKeys.ts";

/** Parameters for the useFetchCustomerReviewsViewData hook. */
export type FetchParams = {
    customerCode: UserUniqueCode;
    pagination: PaginationValues;
    options?: FetchQueryOptions<CustomerReviewsViewData>;
};

/** Manages the server-state and validation for a customer's paginated review history. */
export function useFetchCustomerReviewsViewData(
    {customerCode, pagination, options}: FetchParams
): UseQueryResult<CustomerReviewsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn({
        schema: CustomerReviewsViewDataSchema,
        action: () => getFetchCustomerReviewsViewData({customerCode, pagination})
    });

    return useQuery({
        queryKey: CustomerReviewsViewQueryKeys.reviews({customerCode, ...pagination}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}