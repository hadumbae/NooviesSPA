/**
 * @fileoverview Defines the schema and type for movie reviews including relational user and movie data.
 */


import {MovieReviewSchema} from "@/domains/review/schemas/model";
import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/schemas/user";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/** Zod schema for a movie review with expanded relational data and interaction states. */
export const MovieReviewDetailsSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithGenresSchema,
    isLikedByUser: BooleanValueSchema,
    isUserReview: BooleanValueSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type for a movie review with expanded relational data. */
export type MovieReviewDetails = z.infer<typeof MovieReviewDetailsSchema>;