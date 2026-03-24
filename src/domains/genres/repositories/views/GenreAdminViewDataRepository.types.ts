/**
 * @file Type definitions for the GenreAdminViewDataRepository.
 * @filename GenreAdminViewDataRepository.types.ts
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for fetching detailed genre view data.
 */
export type FetchGenreDetailsParams = {
    /** The URL-friendly unique identifier for the genre. */
    slug: SlugString;
    /** Standard pagination parameters (page, perPage) to apply to the associated movies list. */
    queries: PaginationValues;
}