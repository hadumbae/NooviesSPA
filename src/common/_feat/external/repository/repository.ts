/**
 * @fileoverview Repository for interacting with external third-party APIs and services.
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {ExternalAPIBaseURL} from "@/common/_feat/external/repository/baseURL.ts";

/** Fetches geographical information based on the user's current IP address. */
export const fetchGeolocationByIP = () => {
    const url = buildQueryURL({
        baseURL: ExternalAPIBaseURL,
        path: "ip-geo/get-geolocation",
    });

    return useFetchAPI({url, method: "GET"});
};