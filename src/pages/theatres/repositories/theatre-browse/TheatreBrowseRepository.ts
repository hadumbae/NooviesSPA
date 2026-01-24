/**
 * @file TheatreBrowseRepository.ts
 *
 * Client-side repository for public theatre browse endpoints.
 *
 * Responsible for:
 * - Building browse URLs
 * - Executing HTTP requests
 * - Returning normalized request results
 */

import {
    BrowseTheatreByLocationParams,
    TheatreBrowseMethods,
} from "@/pages/theatres/repositories/theatre-browse/TheatreBrowseRepository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Repository implementation for theatre browsing operations.
 */
export const TheatreBrowseRepository: TheatreBrowseMethods = {
    /** Base API endpoint for theatre browsing */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/browse/theatres`,

    /**
     * Fetches paginated theatres filtered by a location target.
     *
     * @param params Location identifier and pagination values
     * @returns API request result containing theatre browse data
     */
    theatresByLocation(
        {page, perPage, target}: BrowseTheatreByLocationParams,
    ): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `theatres-by-location/paginated`,
            queries: {page, perPage, target},
        });

        return useFetchAPI({method: "GET", url});
    },
};
