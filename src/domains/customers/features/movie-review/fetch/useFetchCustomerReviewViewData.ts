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
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {CustomerReviewViewData, CustomerReviewViewSchema} from "@/domains/customers/features/movie-review/schemas";
import {logZodErrors} from "@/common/hooks/validation/validate-data/logZodErrors.ts";

/**
 * Configuration for the customer review data fetch.
 */
type FetchParams = {
    /** The validated unique code of the customer who authored the review. */
    customerCode: UserUniqueCode;
    /** The validated unique code of the specific review to be retrieved. */
    reviewCode: MovieReviewUniqueCode;
    /** Standard TanStack Query options for caching and staleness logic. */
    options?: UseQueryOptions<CustomerReviewViewData>;
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

    /**
     * Encapsulated fetch and validation logic.
     */
    const fetchDetails = async (): Promise<CustomerReviewViewData> => {
        const {result} = await getFetchCustomerReviewViewData({customerCode, reviewCode});

        const {data, success, error} = validateData({
            data: result,
            schema: CustomerReviewViewSchema
        });

        if (!success) {
            logZodErrors({raw: result, errors: error.errors});
            throw error;
        }

        return data;
    };

    return useQuery({
        queryKey: CustomerViewQueryKeys.review({customerCode, reviewCode}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}