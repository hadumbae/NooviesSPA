/**
 * @fileoverview Type definitions for the genre client view data repository.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";

/** Configuration required to fetch a genre and its movies. */
export type FetchGenreWithMoviesConfig = {
    slug: SlugString;
    moviePagination: PaginationValues;
};