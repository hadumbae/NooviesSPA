/**
 * @fileoverview Custom React hook for fetching aggregated customer profile data using TanStack Query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/repository/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/_feat/profile-overview/fetch/queryKeys.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {CustomerProfileViewData, CustomerProfileViewDataSchema} from "@/domains/customers";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {ObjectId} from "@/common/_schemas";

/** Parameters for the customer profile fetch hook. */
export type FetchParams = {
    customerID: ObjectId;
    options?: FetchQueryOptions<CustomerProfileViewData>;
}

/** Hook to manage the server state and caching of a customer's profile overview. */
export function useFetchCustomerProfileViewData(
    {customerID, options}: FetchParams
): UseQueryResult<CustomerProfileViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn<CustomerProfileViewData>({
        action: () => getFetchCustomerProfileViewData({customerID}),
        schema: CustomerProfileViewDataSchema,
    });

    return useQuery({
        queryKey: CustomerProfileOverviewViewQueryKeys.profile({customerID}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}