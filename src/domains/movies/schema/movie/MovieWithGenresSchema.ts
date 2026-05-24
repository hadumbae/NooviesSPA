/**
 * @fileoverview Validated movie schema for data sets including populated genre objects.
 */

import { MovieReleaseDateRefinement } from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import { z } from "zod";

import { GenreSchema } from "@/domains/genres/schema/genre/GenreSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {MovieBaseSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/** Extended movie schema where the genres field is expected as full objects. */
export const ExtendedMovieWithGenresSchema = MovieBaseSchema.extend({
  genres: generateArraySchema(GenreSchema),
});

/** Validated Movie schema with populated genres and lifecycle refinements. */
export const MovieWithGenresSchema = ExtendedMovieWithGenresSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a movie object containing full genre metadata. */
export type MovieWithGenres = z.infer<typeof MovieWithGenresSchema>;