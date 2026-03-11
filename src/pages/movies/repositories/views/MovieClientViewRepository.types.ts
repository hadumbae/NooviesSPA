/**
 * @file Shared parameter types for movie client view repository requests.
 * @filename MovieClientViewRepository.types.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for requesting movie credit view data.
 */
type GetCreditsForMovieViewParams = {
    /** Movie identifier used for API routing */
    movieID: ObjectId;
}

export type {
    GetCreditsForMovieViewParams,
}