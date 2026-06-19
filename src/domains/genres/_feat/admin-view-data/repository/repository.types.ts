/**
 * @fileoverview Type definitions for the GenreAdminViewDataRepository.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Parameters for fetching detailed genre administrative view data. */
export type FetchGenreDetailsConfig = {
    slug: SlugString;
    queries: PaginationValues;
};