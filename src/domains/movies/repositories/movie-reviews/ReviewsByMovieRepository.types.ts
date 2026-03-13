/**
 * @file Type contracts for fetching reviews by movie.
 * @filename ReviewsByMovieRepository.types.ts
 */

import { PaginationValues } from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Parameters for retrieving reviews for a movie.
 */
export type FetchReviewsByMovieParams = {
    /** Target movie identifier. */
    movieID: ObjectId;

    /** Optional request options. */
    config?: RequestOptions;
};

/**
 * Parameters for paginated movie review retrieval.
 */
export type FetchPaginatedReviewsByMovieParams = PaginationValues & {
    /** Target movie identifier. */
    movieID: ObjectId;

    /**
     * Optional request options.
     * `limit` is omitted because pagination is controlled by `perPage`.
     */
    config?: Omit<RequestOptions, "limit">;
};