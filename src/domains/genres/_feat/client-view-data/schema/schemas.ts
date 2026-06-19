/**
 * @fileoverview Zod validation schemas for the public Genre details view.
 *
 */

import {z} from "zod";
import {GenreSchema} from "@/domains/genres/schema";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/** Validation schema for the consolidated Browse Genre view data. */
export const BrowseGenreWithMoviesViewSchema = z.object({
    genre: GenreSchema,
    movies: generatePaginationSchema(MovieWithGenresSchema),
});

/** Type inferred from BrowseGenreWithMoviesViewSchema. */
export type BrowseGenreWithMoviesViewData = z.infer<typeof BrowseGenreWithMoviesViewSchema>;