/**
 * @file External API repository utilities.
 * Provides functions for interacting with external-facing backend endpoints.
 * @filename ExternalRepository.ts
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/ext`;

/**
 * Requests geolocation data for the current IP address.
 *
 * Builds the endpoint URL and executes the request using `useFetchAPI`.
 *
 * @returns Fetch API hook result for the geolocation request.
 */
export const fetchGeolocationByIP = () => {
    const url = buildQueryURL({
        baseURL,
        path: "ip-geo/get-geolocation",
    });

    return useFetchAPI({url, method: "GET"});
};