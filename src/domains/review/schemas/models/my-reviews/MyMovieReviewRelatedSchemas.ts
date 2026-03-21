/**
 * @file Collection and pagination schemas for user-specific Movie Reviews.
 * @filename MyReviewRelatedSchemas.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MyMovieReviewSchema} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {z} from "zod";

/**
 * Validated pagination wrapper for {@link MyMovieReviewSchema}.
 */
export const MyMovieReviewPaginatedSchema = generatePaginationSchema(MyMovieReviewSchema);

/**
 * TypeScript type inferred from {@link MyMovieReviewPaginatedSchema}.
 */
export type MyPaginatedMovieReviews = z.infer<typeof MyMovieReviewPaginatedSchema>;

/**
 * Zod schema for a flat array of {@link MyMovieReviewSchema} objects.
 */
export const MyMovieReviewArraySchema = generateArraySchema(MyMovieReviewSchema);

/**
 * TypeScript type inferred from {@link MyMovieReviewArraySchema}.
 */
export type MyMovieReviewsArray = z.infer<typeof MyMovieReviewArraySchema>;