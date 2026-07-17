/**
 * @fileoverview Hook for fetching geolocation data based on the client's IP address.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {fetchGeolocationByIP} from "@/common/_feat/external/repository/repository.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";

type FetchParams = {
    options?: FetchQueryOptions<unknown>;
};

/** Hook that retrieves geolocation information based on the user's current IP address. */
export function useFetchIPGeolocationData(
    {options}: FetchParams = {}
): UseQueryResult<unknown, HttpResponseError> {
    const fetchIpData = async () => {
        const {result} = await fetchGeolocationByIP();
        return result;
    }

    return useQuery({
        queryKey: ["api", "external", "ip-geolocation", "data"],
        queryFn: fetchIpData,
        ...useQueryOptionDefaults(options),
    });
}