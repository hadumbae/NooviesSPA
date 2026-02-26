/**
 * @file Parameter types for current user movie review queries.
 * MyMovieReviewRepository.types.ts
 */

import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Query parameters for fetching the current user's movie reviews.
 */
export type CurrentUserMovieReviewsParams = PaginationValues & {
    options?: Omit<RequestOptions, "limit">;
};