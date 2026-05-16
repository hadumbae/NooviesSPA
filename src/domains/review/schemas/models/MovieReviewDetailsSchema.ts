/**
 * @fileoverview Defines the schema and type for detailed movie review data including user and movie relations.
 */

import {MovieReviewSchema} from "@/domains/review/schemas/models";
import {z} from "zod";
import {LeanUserSchema} from "@/domains/users/schemas/user";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/** Zod schema for movie review details including relational data and interaction states. */
export const MovieReviewDetailsSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithGenresSchema,
    isLikedByUser: BooleanValueSchema,
    isUserReview: BooleanValueSchema,
    helpfulCount: NonNegativeNumberSchema,
});

/** Type representation of a movie review with full details. */
export type MovieReviewDetails = z.infer<typeof MovieReviewDetailsSchema>;