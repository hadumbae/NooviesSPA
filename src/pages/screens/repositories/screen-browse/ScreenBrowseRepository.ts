import {
    FetchScreensWithShowingsParams,
    ScreenBrowseMethods,
} from "@/pages/screens/repositories/screen-browse/ScreenBrowseRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Repository for browsing screen-related data.
 *
 * Handles read-only, client-facing API requests used in browse flows,
 * such as fetching screens grouped with their showings.
 */
export const ScreenBrowseRepository: ScreenBrowseMethods = {
    /** Base API endpoint for screen browse routes */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/browse/screens`,

    /**
     * Fetches screens for a theatre along with their showings on a given date.
     *
     * @param params - Query parameters including theatre ID and date string
     * @returns API request wrapper resolving to screen/showing data
     */
    fetchScreensWithShowings(
        { theatreID, dateString }: FetchScreensWithShowingsParams
    ): Promise<RequestReturns<unknown>> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `showings-by-screen/theatre/${theatreID}/date/${dateString}`,
        });

        return useFetchAPI({ method: "GET", url });
    },
};
