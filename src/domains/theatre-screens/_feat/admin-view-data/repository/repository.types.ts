/**
 * @fileoverview Type definitions for the Theatre Screen admin view data repository.
 * Defines the contract for fetching aggregated administrative screen data.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters required to locate and fetch the administration-specific data
 * for a theatre screen.
 */
export type FetchTheatreScreenAdminViewDataConfig = {
    theatreSlug: SlugString;
    screenSlug: SlugString;
};