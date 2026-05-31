/**
 * @file Movie review query key factory.
 * MovieReviewQueryKeys.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {QueryKeyByOptionsParams, QueryKeyByPaginationParams} from "@/common/type/query/QueryKeyTypes.ts";

/**
 * Centralized query key definitions for movie review caching.
 */
export const MovieReviewQueryKeys = {
    /**
     * Root namespace.
     */
    all: ["movie_reviews"] as const,

    /**
     * Current user's review list.
     */
    userList: () => [...MovieReviewQueryKeys.all, "lists", "current"],

    /**
     * Reviews scoped to a movie.
     */
    movieList: (movieID?: ObjectId) =>
        [...MovieReviewQueryKeys.all, "lists", "movies", {movieID}],

    /**
     * Detailed review data scoped to a movie.
     */
    movieDetails: (movieID?: ObjectId) =>
        [...MovieReviewQueryKeys.all, "lists", "movie", "details", {movieID}],

    featuredReviews: (movieID?: ObjectId) =>
        [...MovieReviewQueryKeys.all, "lists", "movie", "featured", {movieID}],

    /**
     * Option-scoped queries.
     */
    query: (params?: QueryKeyByOptionsParams) =>
        [...MovieReviewQueryKeys.all, "lists", "query", params],

    /**
     * Pagination-scoped queries.
     */
    paginated: (params?: QueryKeyByPaginationParams) =>
        [...MovieReviewQueryKeys.all, "lists", "paginated", params],
}