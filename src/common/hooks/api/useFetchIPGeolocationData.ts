/**
 * @file React Query hook for fetching IP geolocation data.
 * @filename useFetchIPGeolocationData.ts
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {fetchGeolocationByIP} from "@/common/repositories/ExternalRepository.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Parameters for {@link useFetchIPGeolocationData}.
 */
type FetchParams = {
    /** Optional React Query configuration overrides. */
    options?: UseQueryOptions<unknown>;
};

/**
 * Fetches geolocation data for the current IP address.
 *
 * Wraps the repository request with a query handler and executes it using
 * React Query.
 *
 * @param params - Query configuration parameters.
 * @returns React Query result for the geolocation request.
 */
export function useFetchIPGeolocationData(
    {options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchIpData = useQueryFnHandler({
        action: () => fetchGeolocationByIP(),
        errorMessage: "Failed to fetch geolocation data."
    });

    return useQuery({
        queryKey: ["api", "external", "ip-geolocation", "data"],
        queryFn: fetchIpData,
        ...useQueryOptionDefaults(options),
    });
}