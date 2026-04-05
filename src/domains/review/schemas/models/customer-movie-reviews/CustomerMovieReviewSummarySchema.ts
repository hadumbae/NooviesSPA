/**
 * @file Zod validation schema for a customer's review summary in the profile view.
 * @filename CustomerMovieReviewSummarySchema.ts
 */

import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";
import {z} from "zod";

/**
 * Simplified review schema designed for administrative and profile overviews.
 * ---
 */
export const CustomerMovieReviewSummarySchema = MovieReviewSchema.extend({
    /** Populated movie details including genre categories. */
    movie: MovieWithGenresSchema,
    /** Total number of "helpful" votes received. */
    helpfulCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type inferred from {@link CustomerMovieReviewSummarySchema}.
 * Represents the structured review data used in the Customer Profile activity feed.
 */
export type CustomerMovieReviewSummary = z.infer<typeof CustomerMovieReviewSummarySchema>;