/**
 * @fileoverview Zod schema and type definition for showings with populated movie details.
 */

import {ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {z} from "zod";

/** Zod schema for a showing combined with populated movie details. */
export const ShowingWithMovieSchema = ShowingSchema.extend({
    movie: MovieWithGenresSchema,
});

/** Type representation of a showing with populated movie details. */
export type ShowingWithMovie = z.infer<typeof ShowingWithMovieSchema>;