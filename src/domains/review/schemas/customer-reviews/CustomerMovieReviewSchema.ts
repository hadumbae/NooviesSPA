/**
 * @fileoverview Zod schema for a customer-specific movie review view with rating metadata.
 *
 */

import {z} from "zod";
import {MovieWithRatingSchema} from "@/domains/movies/schema/movie";
import {CustomerMovieReviewSummarySchema} from "@/domains/review/schemas/customer-reviews/CustomerMovieReviewSummarySchema.ts";

/** Enriched review schema for customer-centric administrative or profile views. */
export const CustomerMovieReviewSchema = CustomerMovieReviewSummarySchema.extend({
    movie: MovieWithRatingSchema,
});

/** Represents a review entry within a customer activity timeline or audit trail. */
export type CustomerMovieReview = z.infer<typeof CustomerMovieReviewSchema>;