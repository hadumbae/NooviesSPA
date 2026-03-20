/**
 * @file Validated movie schema including populated genres and calculated rating metrics.
 * @filename MovieWithRatingSchema.ts
 */

import {ExtendedMovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";

/**
 * Extended movie schema that adds an 'averageRating' field to the populated movie model.
 */
export const ExtendedMovieWithRatingSchema = ExtendedMovieWithGenresSchema.extend({
    /** The arithmetic mean of all user reviews for this movie. Defaults to 0 if unrated. */
    averageRating: NonNegativeNumberSchema,
});

/**
 * Validated Movie schema with populated genres, rating metrics, and lifecycle refinements.
 */
export const MovieWithRatingSchema = ExtendedMovieWithRatingSchema.superRefine(MovieReleaseDateRefinement);

/**
 * TypeScript type inferred from {@link MovieWithRatingSchema}.
 */
export type MovieWithRating = z.infer<typeof MovieWithRatingSchema>;