/**
 * @fileoverview Type definitions for the movie client view data repository.
 */

import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {ISO3166Alpha2CountryCode} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";

/** Configuration for fetching movie overview information. */
export type GetOverviewDataForMovieInfoViewConfig = {
    slug: SlugString;
    queries?: {
        reviewPage: number;
        reviewPerPage: number;
    };
};

/** Configuration for fetching movie review data. */
export type GetReviewsForMovieInfoViewConfig = {
    slug: SlugString;
    queries?: {
        reviewPage?: number;
        reviewPerPage?: number;
    };
};

/** Parameters for retrieving movie credits. */
export type GetCreditsForMovieInfoViewConfig = {
    slug: SlugString;
};

/** Query string parameters for fetching movie showings. */
export type GetShowingsForMovieViewQueryStrings = PaginationValues & {
    near?: string;
    country: ISO3166Alpha2CountryCode;
};

/** Parameters for retrieving movie showings including the slug and query filters. */
export type GetShowingsForMovieInfoViewConfig = {
    slug: SlugString;
    queries: GetShowingsForMovieViewQueryStrings;
};