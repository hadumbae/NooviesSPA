/**
 * @file TypeScript types derived from movie review schemas.
 * MovieReview.types.ts
 */

import {z} from "zod";
import {MovieReviewSchema, PopulatedMovieReviewSchema} from "@/pages/review/schemas/models/MovieReview.schema.ts";

/**
 * Inferred type for a movie review.
 */
export type MovieReview = z.infer<typeof MovieReviewSchema>;

/**
 * Inferred type for a populated movie review.
 */
export type PopulatedMovieReview = z.infer<typeof PopulatedMovieReviewSchema>;