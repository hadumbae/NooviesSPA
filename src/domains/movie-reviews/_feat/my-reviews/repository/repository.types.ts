/**
 * @fileoverview Parameter types for current user movie review repository operations.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {ObjectId} from "@/common/_schemas";
import {MovieReviewForm} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";

/** Parameters for fetching the current user's movie reviews. */
export type CurrentUserMovieReviewsConfig = PaginationValues & {
    config?: Omit<RequestOptions, "limit">;
};

/** Parameters for creating a movie review for the current user. */
export type CreateCurrentUserMovieReviewConfig = {
    data: MovieReviewForm;
    config?: Omit<RequestOptions, "limit">;
}

/** Parameters for updating a movie review for the current user. */
export type UpdateCurrentUserMovieReviewConfig = {
    reviewID: ObjectId;
    data: MovieReviewForm;
    config?: Omit<RequestOptions, "limit">;
}