/**
 * @file React Query hook for retrieving paginated movie reviews for a specific customer.
 * @filename useFetchCustomerReviewsViewData.ts
 */

import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {
    CustomerReviewsViewData,
    CustomerReviewsViewDataSchema
} from "@/domains/customers/features/movie-reviews/viewDataSchema.ts";
import {getFetchCustomerReviewsViewData} from "@/domains/customers/features/movie-reviews/repository.ts";
import {CustomerReviewsViewQueryKeys} from "@/domains/customers/features/movie-reviews/queryKeys.ts";

/**
 * Parameters for the useFetchCustomerReviewsViewData hook.
 */
type FetchParams = {
    /** The validated unique code of the customer author. */
    customerCode: UserUniqueCode;
    /** Current pagination state (page, perPage) to control the data slice. */
    pagination: PaginationValues;
    /** Standard React Query options for caching, stale time, and behavior overrides. */
    options?: FetchQueryOptions<CustomerReviewsViewData>;
}

/**
 * Manages the server-state and validation for a customer's paginated review history.
 * ---
 * @param params - The configuration object for identity and pagination.
 * @returns {UseQueryResult} The standard React Query result object containing
 * data, status, and fetch methods.
 */
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