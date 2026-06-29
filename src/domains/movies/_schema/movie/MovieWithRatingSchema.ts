/**
 * @fileoverview Validated movie schema including populated genres and calculated rating metrics.
 *
 */

import {ExtendedMovieWithGenresSchema} from "@/domains/movies/_schema/movie/MovieWithGenresSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReleaseDateRefinement} from "@/domains/movies/_schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";

/**
 * Movie schema that adds an average rating field to the populated movie model.
 */
export const ExtendedMovieWithRatingSchema = ExtendedMovieWithGenresSchema.extend({
    averageRating: NonNegativeNumberSchema,
});

/**
 * Validated movie schema with populated genres, rating metrics, and release date refinements.
 */
export const MovieWithRatingSchema = ExtendedMovieWithRatingSchema.superRefine(MovieReleaseDateRefinement);

/**
 * TypeScript type for a movie including genres and rating metrics.
 */
export type MovieWithRating = z.infer<typeof MovieWithRatingSchema>;