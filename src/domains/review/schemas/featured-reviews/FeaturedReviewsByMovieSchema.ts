/**
 * @file Schema for featured movie review responses.
 * @filename FeaturedReviewsByMovieSchema.ts
 */

import { z } from "zod";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {MovieReviewDetailsSchema} from "@/domains/review/schemas/models";

/**
 * Response schema for featured reviews of a movie.
 */
export const FeaturedReviewsByMovieSchema = z.object({
    userReview: MovieReviewDetailsSchema.nullable(),
    reviews: generateArraySchema(MovieReviewDetailsSchema),
});

/**
 * Featured movie review response.
 */
export type FeaturedReviewsByMovie = z.infer<typeof FeaturedReviewsByMovieSchema>;