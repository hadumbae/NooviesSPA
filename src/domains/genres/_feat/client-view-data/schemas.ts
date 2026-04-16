/**
 * @fileoverview Zod validation schema for the public Genre details view.
 * Defines the structure of the aggregated data returned when a user
 * views a specific genre and its paginated collection of movies.
 */

import {z} from "zod";
import {GenreSchema} from "@/domains/genres/schema";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/**
 * Validation schema for the consolidated "Browse Genre" view data.
 */
export const BrowseGenreWithMoviesViewSchema = z.object({
    genre: GenreSchema,
    movies: generatePaginationSchema(MovieWithGenresSchema),
});

/**
 * TypeScript type inferred from {@link BrowseGenreWithMoviesViewSchema}.
 */
export type BrowseGenreWithMoviesViewData = z.infer<typeof BrowseGenreWithMoviesViewSchema>;