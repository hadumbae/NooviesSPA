/**
 * @file Custom React hook for fetching aggregated customer profile data using TanStack Query.
 * @filename useFetchCustomerProfileViewData.ts
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/features/profile-overview/repository.ts";
import {CustomerProfileOverviewViewQueryKeys} from "@/domains/customers/features/profile-overview/queryKeys.ts";

/**
 * Parameters for the customer profile fetch hook.
 * ---
 */
type FetchParams = {
    /** The unique identifier (code) of the customer to retrieve. */
    customerCode: UserUniqueCode;
    /** Optional TanStack Query configurations (e.g., staleTime, enabled, refetchOnWindowFocus). */
    options?: FetchQueryOptions<unknown>;
}

/**
 * Hook to manage the server state and caching of a customer's profile overview.
 * ---
 * @param params - The customer code and optional query behavior overrides.
 * @returns The TanStack Query result object containing the customer's aggregated view data.
 */
export function useFetchCustomerProfileViewData(
    {customerCode, options}: FetchParams
) {
    /** * Standardized query function handler that executes the repository
     * action with integrated error messaging.
     */
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