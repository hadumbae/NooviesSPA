/**
 * @file Repository for external (third-party) API integrations.
 * @filename ExternalRepository.ts
 *
 * Encapsulates URL construction and fetch behavior for external services.
 */

import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Access layer for external API requests.
 */
export const ExternalRepository = {
    /**
     * Fetches IP geolocation data from the Ipify API using the configured API key.
     *
     * @returns Result of the API request from `useFetchAPI`.
     */
    fetchIpifyCountryData: () => {
        const url = buildQueryURL({
            baseURL: `https://geo.ipify.org/`,
            path: "api/v2/country",
            queries: { apiKey: import.meta.env.VITE_IPIFY_KEY }
        });

        console.log("URL: ", url.toString());

        return useFetchAPI({ url });
    },
};