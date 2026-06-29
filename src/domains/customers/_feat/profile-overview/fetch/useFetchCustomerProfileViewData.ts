/**
 * @fileoverview Custom React hook for fetching aggregated customer profile data using TanStack Query.
 */
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/_feat/profile-overview/repository/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/_feat/profile-overview/fetch/queryKeys.ts";

/** Parameters for the customer profile fetch hook. */
export type FetchParams = {
    customerCode: UserUniqueCode;
    options?: FetchQueryOptions<unknown>;
}

/** Hook to manage the server state and caching of a customer's profile overview. */
export function useFetchCustomerProfileViewData(
    {customerCode, options}: FetchParams
) {
    const fetchDetails = useQueryFnHandler({
        action: () => getFetchCustomerProfileViewData({customerCode}),
        errorMessage: "Failed to fetch customer details.",
    });

    return useQuery({
        queryKey: CustomerProfileOverviewViewQueryKeys.profile({customerCode}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}