/**
 * @fileoverview Type definitions for the GenreAdminViewDataRepository.
 * Defines the contract for fetching aggregated administrative data for a specific genre.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for fetching detailed genre administrative view data.
 */
export type FetchGenreDetailsConfig = {
    slug: SlugString;
    queries: PaginationValues;
};