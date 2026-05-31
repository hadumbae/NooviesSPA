/**
 * @fileoverview Schema for featured movie review responses.
 */

import { z } from "zod";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {MovieReviewDetailsSchema} from "@/domains/review/schemas/model";

/** Response schema for featured reviews of a movie. */
export const FeaturedReviewsByMovieSchema = z.object({
    userReview: MovieReviewDetailsSchema.nullable(),
    reviews: generateArraySchema(MovieReviewDetailsSchema),
});

/** Featured movie review response. */
export type FeaturedReviewsByMovie = z.infer<typeof FeaturedReviewsByMovieSchema>;