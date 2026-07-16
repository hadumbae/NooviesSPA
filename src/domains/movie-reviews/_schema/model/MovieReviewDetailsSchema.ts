/**
 * @fileoverview Defines the schema and type for movie reviews including relational user and movie data.
 */


import {z} from "zod";
import {PopulatedMovieReviewSchema} from "@/domains/movie-reviews/_schema/model/PopulatedMovieReviewSchema.ts";
import {BooleanValueSchema} from "@/common/_schemas/boolean/BooleanValueSchema.ts";
import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/** Zod schema for a movie review with expanded relational data and interaction states. */
export const MovieReviewDetailsSchema = PopulatedMovieReviewSchema.extend({
    isLikedByUser: BooleanValueSchema,
    isUserReview: BooleanValueSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type for a movie review with expanded relational data. */
export type MovieReviewDetails = z.infer<typeof MovieReviewDetailsSchema>;