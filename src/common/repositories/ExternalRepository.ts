import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * @file ExternalRepository.ts
 *
 * Repository for external (third-party) API integrations.
 *
 * Encapsulates URL construction and fetch behavior to keep external
 * service access isolated from application logic.
 */
export const ExternalRepository = {
    /**
     * Fetches IP geolocation and metadata from the ipapi.co API.
     *
     * @returns Fetch result from {@link useFetchAPI}
     *
     * @example
     * ```ts
     * const { data, error, isLoading } = ExternalRepository.fetchIpAPIData();
     * ```
     */
    fetchIpAPIData: () => {
        const url = buildQueryURL({
            baseURL: "https://ipapi.co",
            path: "json",
        });

        console.log("URL: ", url.toString())

        return useFetchAPI({ url });
    },
};
