/**
 * @file Custom React hook for fetching aggregated customer profile data using TanStack Query.
 * @filename useFetchCustomerProfileViewData.ts
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {useQuery} from "@tanstack/react-query";
import {CustomerViewQueryKeys} from "@/domains/customers/features/profile-overview/fetch/queryKeys.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {getFetchCustomerProfileViewData} from "@/domains/customers/features/profile-overview/repositories";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Parameters for the customer profile fetch hook.
 * ---
 */
type FetchParams = {
    /** The unique identifier (code) of the customer to retrieve. */
    code: UserUniqueCode;
    /** Optional TanStack Query configurations (e.g., staleTime, enabled, refetchOnWindowFocus). */
    options?: UseQueryOptions<unknown>;
}

/**
 * Hook to manage the server state and caching of a customer's profile overview.
 * ---
 * @param params - The customer code and optional query behavior overrides.
 * @returns The TanStack Query result object containing the customer's aggregated view data.
 */
export function useFetchCustomerProfileViewData(
    {code, options}: FetchParams
) {
    /** * Standardized query function handler that executes the repository
     * action with integrated error messaging.
     */
    const fetchDetails = useQueryFnHandler({
        action: () => getFetchCustomerProfileViewData(code),
        errorMessage: "Failed to fetch customer details.",
    });

    return useQuery({
        queryKey: CustomerViewQueryKeys.profile({code}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}