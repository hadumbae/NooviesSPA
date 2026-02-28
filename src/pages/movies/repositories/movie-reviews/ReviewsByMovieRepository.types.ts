/**
 * @file Type contracts for fetching reviews by movie.
 * ReviewsByMovieRepository.types.ts
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters required to fetch reviews for a specific movie.
 *
 * Extends PaginationValues to enforce page-based pagination.
 */
export type FetchReviewsByMovieParams = PaginationValues & {
    /**
     * The unique identifier of the movie whose reviews
     * are being requested.
     */
    movieID: ObjectId;

    /**
     * Optional HTTP request configuration.
     *
     * The `limit` field is intentionally omitted because
     * pagination is controlled via `perPage`.
     */
    config?: Omit<RequestOptions, "limit">;
};