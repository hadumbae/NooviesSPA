/**
 * @file Validated schema for a user-specific Movie Review view.
 * @filename MyMovieReviewSchema.ts
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {MovieWithRatingSchema} from "@/domains/movies/schema/movie/MovieWithRatingSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReviewSchema} from "@/domains/review/schemas/models/MovieReview.schema.ts";

/**
 * Zod schema representing a fully enriched movie review intended for the author's view.
 */
export const MyMovieReviewSchema = MovieReviewSchema.extend({
    /** Populated author details (typically the current user's public info). */
    user: LeanUserSchema,

    /** Populated movie details including full genre objects and ratings. */
    movie: MovieWithRatingSchema,

    /** The total count of users who flagged this review as helpful. */
    helpfulCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type inferred from {@link MyMovieReviewSchema}.
 */
export type MyMovieReview = z.infer<typeof MyMovieReviewSchema>;