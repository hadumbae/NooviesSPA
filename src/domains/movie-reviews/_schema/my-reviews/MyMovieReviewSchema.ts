/**
 * @fileoverview Zod schema and TypeScript type for a user-specific movie review view.
 *
 */

import {z} from "zod";

import {MovieReviewSchema} from "@/domains/movie-reviews/_schema/model";
import { MovieWithRatingSchema } from "@/domains/movies/_schema/movie";
import {LeanUserSchema} from "@/domains/users/_schema/user/LeanUserSchema";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/** Schema for a movie review enriched with user and movie details for the author's view. */
export const MyMovieReviewSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithRatingSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type representing a movie review enriched with user and movie details. */
export type MyMovieReview = z.infer<typeof MyMovieReviewSchema>;