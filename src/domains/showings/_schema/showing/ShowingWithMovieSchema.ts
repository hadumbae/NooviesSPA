/**
 * @fileoverview Zod schema and type definition for showings with populated movie details.
 */

import {z} from "zod";
import {ShowingSchema} from "@/domains/showings/_schema/showing/ShowingSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/** Zod schema for a showing combined with populated movie details. */
export const ShowingWithMovieSchema = ShowingSchema.extend({
    movie: MovieWithGenresSchema,
});

/** Type representation of a showing with populated movie details. */
export type ShowingWithMovie = z.infer<typeof ShowingWithMovieSchema>;