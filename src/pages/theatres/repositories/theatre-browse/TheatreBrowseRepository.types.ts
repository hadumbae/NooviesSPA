/**
 * @file TheatreBrowseRepository.types.ts
 *
 * Public contracts for theatre browse repository operations.
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationParams = PaginationValues & {
    /** Location identifier (e.g. city, country code, free-form target) */
    target: string;
};

/**
 * Theatre browse repository contract.
 */
export interface TheatreBrowseMethods {
    /** Base API endpoint for browse routes */
    baseURL: string;

    /**
     * Fetches paginated theatres filtered by location.
     *
     * @param params Location and pagination parameters
     * @returns API request result
     */
    theatresByLocation(params: BrowseTheatreByLocationParams): Promise<RequestReturns>;
}
