/**
 * @file Specialized Zod schema for a customer-specific Movie Review view with rating metadata.
 * @filename CustomerMovieReviewSchema.ts
 */

import {z} from "zod";
import {MovieWithRatingSchema} from "@/domains/movies/schema/movie/MovieWithRatingSchema.ts";
import {
    CustomerMovieReviewSummarySchema
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";

/**
 * Enriched review schema specifically for customer-centric administrative or profile views.
 * ---
 */
export const CustomerMovieReviewSchema = CustomerMovieReviewSummarySchema.extend({
    /** Populated movie details including genres and system-wide rating averages. */
    movie: MovieWithRatingSchema,
});

/**
 * TypeScript type inferred from {@link CustomerMovieReviewSchema}.
 * Represents a review entry within a customer's activity timeline or audit trail.
 */
export type CustomerMovieReview = z.infer<typeof CustomerMovieReviewSchema>;