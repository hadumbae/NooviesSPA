/**
 * @file Query key factories for movie client view data.
 * @filename MovieClientViewsQueryKeys.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";

/**
 * Parameters used when generating paginated query keys.
 */
type PaginatedSlugParams = Partial<PaginationValues> & {
    /** Optional movie slug used for scoping the query. */
    slug?: SlugString;
};

/**
 * Query key builders for movie client view data.
 */
export const MovieClientViewsQueryKeys = {
    /** Base scope for movie client view queries. */
    all: ["movies", "views", "client"],

    /** Query key for movie credits view data. */
    credits: (slug?: SlugString) =>
        [...MovieClientViewsQueryKeys.all, "credits", {slug}],

    /** Query key for paginated movie showings. */
    showings: ({slug, page, perPage}: PaginatedSlugParams = {}) =>
        [...MovieClientViewsQueryKeys.all, "showings", {slug, page, perPage}],
};