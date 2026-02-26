/**
 * @file Derived schemas for populated movie review collections.
 * MovieReviewRelated.schema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {PopulatedMovieReviewSchema} from "@/pages/review/schemas/models/MovieReview.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/**
 * Array schema for populated movie reviews.
 */
export const PopulatedMovieReviewArraySchema = generateArraySchema(PopulatedMovieReviewSchema);

/**
 * Pagination schema for populated movie reviews.
 */
export const PaginatedPopulatedMovieReviewsSchema = generatePaginationSchema(PopulatedMovieReviewSchema);