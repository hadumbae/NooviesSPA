/**
 * @fileoverview Type definitions for theatre search operations.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {ISO3166Alpha2CountryCode} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationConfig = PaginationValues & {
    target?: string;
    country?: ISO3166Alpha2CountryCode;
    showingsPerTheatre?: number;
};