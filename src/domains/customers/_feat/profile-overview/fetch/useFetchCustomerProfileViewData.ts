/**
 * @fileoverview Custom React hook for fetching aggregated customer profile data using TanStack Query.
 */
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/repository/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/_feat/profile-overview/fetch/queryKeys.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {CustomerProfileViewData, CustomerProfileViewDataSchema} from "@/domains/customers";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/** Parameters for the customer profile fetch hook. */
export type FetchParams = {
    customerCode: UserUniqueCode;
    options?: FetchQueryOptions<CustomerProfileViewData>;
}

/** Hook to manage the server state and caching of a customer's profile overview. */
export function useFetchCustomerProfileViewData(
    {customerCode, options}: FetchParams
): UseQueryResult<CustomerProfileViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn<CustomerProfileViewData>({
        action: () => getFetchCustomerProfileViewData({customerCode}),
        schema: CustomerProfileViewDataSchema,
    });

    return useQuery({
        queryKey: CustomerProfileOverviewViewQueryKeys.profile({customerCode}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}