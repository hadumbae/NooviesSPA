/**
 * @fileoverview Type definitions for the Theatre Admin View repository configuration.
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Configuration parameters for retrieving theatre-specific dashboard data.
 */
export type GetFetchTheatreDetailsViewDataConfig = {
    slug: SlugString;
    queries?: {
        personPage?: number;
        personPerPage?: number;
        showingLimit?: number;
    }
};