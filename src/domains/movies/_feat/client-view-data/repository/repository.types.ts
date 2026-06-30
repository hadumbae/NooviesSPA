/**
 * @fileoverview Type definitions for the movie client view data repository.
 */

import {SlugString} from "@/common/_schemas/strings/SlugString.ts";
import {ISO3166Alpha2CountryCode} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";

/** Configuration for fetching movie overview information. */
export type FetchInfoOverviewConfig = {
    slug: SlugString;
    queries?: {
        reviewPage: number;
        reviewPerPage: number;
    };
};

/** Parameters for retrieving movie credits. */
export type GetCreditsForMovieViewConfig = {
    slug: SlugString;
};

/** Query string parameters for fetching movie showings. */
export type GetShowingsForMovieViewQueryStrings = PaginationValues & {
    near?: string;
    country: ISO3166Alpha2CountryCode;
};

/** Parameters for retrieving movie showings including the slug and query filters. */
export type GetShowingsForMovieViewConfig = {
    slug: SlugString;
    queries: GetShowingsForMovieViewQueryStrings;
};