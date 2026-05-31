/**
 * @fileoverview Zod schema and TypeScript type for a user-specific movie review view.
 *
 */

import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

import {MovieReviewSchema} from "@/domains/review/schemas/model";
import { MovieWithRatingSchema } from "@/domains/movies/schema/movie";

/** Schema for a movie review enriched with user and movie details for the author's view. */
export const MyMovieReviewSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithRatingSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type representing a movie review enriched with user and movie details. */
export type MyMovieReview = z.infer<typeof MyMovieReviewSchema>;