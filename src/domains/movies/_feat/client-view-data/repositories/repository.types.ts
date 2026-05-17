/**
 * @fileoverview Type definitions for the movie client view data repository.
 */

import {SlugString} from "src/common/schema/strings/simple-strings/SlugString.ts";
import {ISO3166Alpha2CountryCode} from "src/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {PaginationValues} from "src/common/features/fetch-pagination-search-params";

/** Configuration for fetching movie overview information. */
export type FetchInfoOverviewConfig = {
    slug: SlugString;
    queries?: {
        reviewPage: number;
        reviewPerPage: number;
    };
};

/** Parameters for retrieving movie credits. */
export type GetCreditsForMovieViewParams = {
    slug: SlugString;
};

/** Query string parameters for fetching movie showings. */
export type GetShowingsForMovieViewQueryStrings = PaginationValues & {
    near?: string;
    country: ISO3166Alpha2CountryCode;
};

/** Parameters for retrieving movie showings including the slug and query filters. */
export type GetShowingsForMovieViewParams = {
    slug: SlugString;
    queries: GetShowingsForMovieViewQueryStrings;
};