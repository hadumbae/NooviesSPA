/**
 * @file Shared parameter types for movie client view repository requests.
 * @filename MovieClientViewRepository.types.ts
 */

import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/**
 * Parameters for requesting movie credit view data.
 */
type GetCreditsForMovieViewParams = {
    /** Movie identifier used for API routing */
    slug: SlugString;
}

export type {
    GetCreditsForMovieViewParams,
}