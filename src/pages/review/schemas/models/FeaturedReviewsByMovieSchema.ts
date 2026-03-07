/**
 * @file Schema for featured movie review responses.
 * @filename FeaturedReviewsByMovieSchema.ts
 */

import { z } from "zod";
import { MovieReviewDetailsSchema } from "@/pages/review/schemas/models/MovieReview.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";

/**
 * Response schema for featured reviews of a movie.
 */
export const FeaturedReviewsByMovieSchema = z.object({
    /** Review authored by the requesting user, if present. */
    userReview: MovieReviewDetailsSchema.nullable(),

    /** Featured reviews for the movie. */
    reviews: generateArraySchema(MovieReviewDetailsSchema),
});

/**
 * Featured movie review response.
 */
export type FeaturedReviewsByMovie = z.infer<typeof FeaturedReviewsByMovieSchema>;