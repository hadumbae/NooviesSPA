/**
 * @file Query key factory for MovieReview cache scoping.
 * MovieReviewQueryKeys.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {QueryKeyByOptionsParams, QueryKeyByPaginationParams} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Centralised query key definitions for MovieReview data.
 *
 * Ensures consistent cache segmentation across user,
 * movie-scoped, and parameterised queries.
 */
export const MovieReviewQueryKeys = {
    /**
     * Base namespace for all MovieReview query keys.
     */
    all: ["movie_keys"] as const,

    /**
     * Query key for the current user's MovieReview list.
     */
    userList: () => [...MovieReviewQueryKeys.all, "lists", "current"],

    /**
     * Query key for MovieReviews associated with a specific movie.
     */
    movieList: (movieID?: ObjectId) => [...MovieReviewQueryKeys.all, "lists", "movies", {movieID}],

    /**
     * Query key for option-scoped MovieReview queries.
     */
    query: (params?: QueryKeyByOptionsParams) =>
        [...MovieReviewQueryKeys.all, "lists", "query", params],

    /**
     * Query key for paginated MovieReview queries.
     */
    paginated: (params?: QueryKeyByPaginationParams) =>
        [...MovieReviewQueryKeys.all, "lists", "paginated", params],
}