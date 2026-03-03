/**
 * @file Movie review inferred types.
 * MovieReview.types.ts
 */

import {z} from "zod";
import {
    MovieReviewDetailsSchema,
    MovieReviewSchema,
    PopulatedMovieReviewSchema
} from "@/pages/review/schemas/models/MovieReview.schema.ts";

/**
 * Movie review type.
 */
export type MovieReview = z.infer<typeof MovieReviewSchema>;

/**
 * Populated movie review type.
 */
export type PopulatedMovieReview = z.infer<typeof PopulatedMovieReviewSchema>;

/**
 * Detailed movie review type.
 */
export type MovieReviewDetails = z.infer<typeof MovieReviewDetailsSchema>;