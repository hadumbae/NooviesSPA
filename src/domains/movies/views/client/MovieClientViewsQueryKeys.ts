/**
 * @file Query key factories for movie client view data hooks.
 * @filename MovieClientViewsQueryKeys.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Query key builders for movie client view data.
 */
export const MovieClientViewsQueryKeys = {
    /** Base scope for all movie client view queries */
    all: ["movies", "views", "client"],

    /** Query key for movie credits view data */
    credits: (movieID?: ObjectId) => [...MovieClientViewsQueryKeys.all, "credits", {movieID}],
}