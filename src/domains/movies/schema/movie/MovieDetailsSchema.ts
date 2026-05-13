/**
 * @fileoverview Validated movie schema for detailed views including populated relations.
 *
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";

import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MovieBaseSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Extended movie schema where relational IDs are replaced with full genre objects.
 */
export const ExtendedMovieDetailsSchema = MovieBaseSchema.extend({
    genres: generateArraySchema(GenreSchema),
});

/**
 * Detailed movie schema incorporating populated genres and release date refinements.
 *
 * NOTE: This schema originally contained virtual fields that have since been removed.
 * Currently, this is functionally identical to `MovieWithGenresSchema`.
 * Consider consolidating or removing one of these schemas to reduce redundancy.
 */
export const MovieDetailsSchema = ExtendedMovieDetailsSchema.superRefine(MovieReleaseDateRefinement);

/** Movie object with populated relations used for detailed views. */
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;