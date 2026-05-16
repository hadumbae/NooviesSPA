/**
 * @fileoverview Validated schema for a user-specific Movie Review view.
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

import {MovieReviewSchema} from "@/domains/review/schemas/models";
import { MovieWithRatingSchema } from "@/domains/movies/schema/movie";

/**
 * Zod schema representing a fully enriched movie review intended for the author's view.
 */
export const MyMovieReviewSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithRatingSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/**
 * TypeScript type representing a movie review enriched with user and movie details.
 */
export type MyMovieReview = z.infer<typeof MyMovieReviewSchema>;