/**
 * @fileoverview Type definitions for theatre search operations.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationConfig = PaginationValues & {
    target?: string;
    showingsPerTheatre?: number;
};