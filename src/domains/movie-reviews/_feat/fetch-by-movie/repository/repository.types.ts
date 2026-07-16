/**
 * @fileoverview Type contracts for fetching reviews by movie.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {ObjectId} from "@/common/_schemas";

/** Parameters for retrieving reviews for a movie. */
export type FetchReviewsByMovieConfig = {
    movieID: ObjectId;
    config?: RequestOptions;
};

/** Parameters for paginated movie review retrieval. */
export type FetchPaginatedReviewsByMovieConfig = PaginationValues & {
    movieID: ObjectId;
    config?: Omit<RequestOptions, "limit">;
};