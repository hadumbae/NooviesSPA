/**
 * @file Movie review Zod schemas.
 * MovieReview.schema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {MovieWithGenresSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {LeanUserSchema} from "@/pages/users/schemas/user/User.schema.ts";

/**
 * Movie review schema using identifier references.
 */
export const MovieReviewSchema = z.object({
    _id: IDStringSchema,
    user: IDStringSchema,
    movie: IDStringSchema,
    displayName: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
    reviewText: NonEmptyStringSchema.max(2000, "Must be 2000 characters or less.").optional(),
    summary: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
    rating: PositiveNumberSchema.max(5, "Must be 1-5."),
    isRecommended: BooleanValueSchema.optional(),
});

/**
 * Movie review schema with populated relations.
 */
export const PopulatedMovieReviewSchema = MovieReviewSchema.extend({
    user: LeanUserSchema,
    movie: MovieWithGenresSchema,
});

/**
 * Populated review schema with user-specific metadata.
 */
export const MovieReviewDetailsSchema = PopulatedMovieReviewSchema.extend({
    isLikedByUser: BooleanValueSchema,
});