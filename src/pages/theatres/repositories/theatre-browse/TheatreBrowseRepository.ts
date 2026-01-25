/**
 * @file TheatreBrowseRepository.ts
 *
 * Client-side repository for public theatre browse endpoints.
 *
 * Handles:
 * - URL construction for browse queries
 * - HTTP request execution
 * - Normalized API responses
 */

import {
    BrowseTheatreByLocationParams,
    TheatreBrowseMethods,
} from "@/pages/theatres/repositories/theatre-browse/TheatreBrowseRepository.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Concrete implementation of theatre browse repository methods.
 */
export const TheatreBrowseRepository: TheatreBrowseMethods = {
    /** Base API endpoint for theatre browse routes */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/browse/theatres`,

    /**
     * Retrieves paginated theatres filtered by a location target.
     *
     * Optionally limits the number of showings returned per theatre.
     *
     * @param params Pagination, location target, and browse configuration
     * @returns API request result containing paginated theatre data
     */
    theatresByLocation(
        {page, perPage, target, config}: BrowseTheatreByLocationParams,
    ): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `theatres-by-location/paginated`,
            queries: {
                page,
                perPage,
                target,
                limit: config?.showingsPerTheatre,
            },
        });

        return useFetchAPI({method: "GET", url});
    },
};
