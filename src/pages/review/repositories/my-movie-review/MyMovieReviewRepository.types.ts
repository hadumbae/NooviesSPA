/**
 * @file Parameter types for current user movie review queries.
 * MyMovieReviewRepository.types.ts
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {MovieReviewForm} from "@/pages/review/schemas/forms/MovieReviewForm.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Query parameters for fetching the current user's movie reviews.
 */
export type CurrentUserMovieReviewsParams = PaginationValues & {
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Parameters for creating a movie review for the current user.
 */
export type CreateCurrentUserMovieReviewParams = {
    data: MovieReviewForm;
    config?: Omit<RequestOptions, "limit">;
}

/**
 * Parameters for updating a movie review for the current user.
 */
export type UpdateCurrentUserMovieReviewParams = {
    reviewID: ObjectId;
    data: MovieReviewForm;
    config?: Omit<RequestOptions, "limit">;
}