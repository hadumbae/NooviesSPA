/**
 * @file Zod model schemas for MovieReview entities.
 * MovieReview.schema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {MovieWithGenresSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

/**
 * Base MovieReview schema using reference identifiers.
 */
export const MovieReviewSchema = z.object({
    _id: IDStringSchema,
    user: IDStringSchema,
    movie: IDStringSchema,
    reviewText: NonEmptyStringSchema.max(2000, "Must be 2000 characters or less.").optional(),
    rating: PositiveNumberSchema.max(5, "Must be 1-5."),
    isRecommended: BooleanValueSchema.optional(),
});

/**
 * MovieReview schema with populated movie relation.
 */
export const PopulatedMovieReviewSchema = MovieReviewSchema.extend({
    movie: MovieWithGenresSchema,
});