/**
 * @file Parameter types for movie client view repository requests.
 * @filename MovieClientViewRepository.types.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ISO3166Alpha2CountryCode} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Parameters for requesting movie credit data.
 */
type GetCreditsForMovieViewParams = {
    /** Movie slug used for routing. */
    slug: SlugString;
};

/**
 * Parameters for requesting paginated movie showings.
 */
type GetShowingsForMovieViewParams = PaginationValues & {
    /** Movie slug used for routing. */
    slug: SlugString;

    /** Optional location filter. */
    near?: string;

    /** Country used for regional filtering. */
    country: ISO3166Alpha2CountryCode;
};

export type {
    GetCreditsForMovieViewParams,
    GetShowingsForMovieViewParams,
};