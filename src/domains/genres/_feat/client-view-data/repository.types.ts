/**
 * @fileoverview Type definitions for the Genre Client View Data repository.
 * Defines the request structures for public genre-related data operations.
 */

import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Configuration required to fetch a genre and its movies.
 */
export type FetchGenreWithMoviesConfig = {
    slug: SlugString;
    moviePagination: PaginationValues;
};