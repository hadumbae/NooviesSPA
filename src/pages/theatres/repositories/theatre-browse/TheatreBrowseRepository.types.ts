/**
 * @file TheatreBrowseRepository.types.ts
 *
 * Public contracts for theatre browse repository operations.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Optional configuration for theatre browse queries.
 */
export type BrowseTheatreByLocationConfig = {
    /** Maximum number of showings returned per theatre */
    showingsPerTheatre?: number;
};

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationParams = PaginationValues & {
    /**
     * Location target used for filtering theatres.
     *
     * Can represent a country code, city name, or free-form marker.
     */
    target?: string;

    /** Additional browse configuration */
    config?: BrowseTheatreByLocationConfig;
};

/**
 * Contract for theatre browse repository implementations.
 */
export interface TheatreBrowseMethods {
    /** Base API endpoint for browse routes */
    baseURL: string;

    /**
     * Fetches paginated theatres filtered by location.
     *
     * @param params Pagination, target, and configuration options
     * @returns API request result
     */
    theatresByLocation(
        params: BrowseTheatreByLocationParams
    ): Promise<RequestReturns>;
}
