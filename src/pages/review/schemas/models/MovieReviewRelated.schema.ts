/**
 * @file Movie review collection schemas.
 * MovieReviewRelated.schema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {
    MovieReviewDetailsSchema,
    PopulatedMovieReviewSchema
} from "@/pages/review/schemas/models/MovieReview.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/**
 * Array of populated movie reviews.
 */
export const PopulatedMovieReviewArraySchema =
    generateArraySchema(PopulatedMovieReviewSchema);

/**
 * Paginated populated movie reviews.
 */
export const PaginatedPopulatedMovieReviewsSchema =
    generatePaginationSchema(PopulatedMovieReviewSchema);

/**
 * Array of detailed movie reviews.
 */
export const MovieReviewDetailsArraySchema =
    generateArraySchema(MovieReviewDetailsSchema);

/**
 * Paginated detailed movie reviews.
 */
export const PaginatedMovieReviewDetailsSchema =
    generatePaginationSchema(MovieReviewDetailsSchema);