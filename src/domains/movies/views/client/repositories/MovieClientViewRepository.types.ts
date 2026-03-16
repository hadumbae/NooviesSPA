/**
 * @file Parameter types for movie client view repository requests.
 * @filename MovieClientViewRepository.types.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ISO3166Alpha2CountryCode} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Parameters for retrieving movie credit data.
 */
export type GetCreditsForMovieViewParams = {
    /** Movie slug used for routing. */
    slug: SlugString;
};

/**
 * Query parameters used when retrieving movie showings.
 */
export type GetShowingsForMovieViewQueryStrings = PaginationValues & {
    /** Optional location filter for nearby showings. */
    near?: string;

    /** Country used for regional filtering. */
    country: ISO3166Alpha2CountryCode;
};

/**
 * Parameters for retrieving movie showings.
 */
export type GetShowingsForMovieViewParams = {
    /** Movie slug used for routing. */
    slug: SlugString;

    /** Query parameters applied to the request. */
    queries: GetShowingsForMovieViewQueryStrings;
};