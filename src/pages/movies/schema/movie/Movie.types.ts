import { z } from "zod";
import {
    MovieArraySchema,
    MovieDetailsArraySchema,
    MovieDetailsSchema,
    MovieSchema,
    MovieWithGenresSchema,
    PaginatedMovieDetailsSchema,
    PaginatedMovieSchema,
} from "@/pages/movies/schema/movie/Movie.schema.ts";

/* -------------------------------------------------------------------------------------------------
 * Base Types
 * ----------------------------------------------------------------------------------------------- */

/**
 * **Movie**
 *
 * Represents a movie with base properties and associated genre ID references.
 * Derived from {@link MovieSchema}.
 */
export type Movie = z.infer<typeof MovieSchema>;

/**
 * **MovieDetails**
 *
 * Represents detailed movie information, including full genre objects
 * and the number of showings linked to the movie.
 * Derived from {@link MovieDetailsSchema}.
 */
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

/**
 * **MovieWithGenres**
 *
 * Represents a movie object containing full genre data,
 * but without a showing count.
 * Derived from {@link MovieWithGenresSchema}.
 */
export type MovieWithGenres = z.infer<typeof MovieWithGenresSchema>;

/* -------------------------------------------------------------------------------------------------
 * Collections
 * ----------------------------------------------------------------------------------------------- */

/**
 * **MovieArray**
 *
 * Array of {@link Movie} objects.
 * Derived from {@link MovieArraySchema}.
 */
export type MovieArray = z.infer<typeof MovieArraySchema>;

/**
 * **MovieDetailsArray**
 *
 * Array of {@link MovieDetails} objects.
 * Derived from {@link MovieDetailsArraySchema}.
 */
export type MovieDetailsArray = z.infer<typeof MovieDetailsArraySchema>;

/* -------------------------------------------------------------------------------------------------
 * Pagination
 * ----------------------------------------------------------------------------------------------- */

/**
 * **PaginatedMovies**
 *
 * Represents a paginated result set of {@link Movie} objects.
 * Derived from {@link PaginatedMovieSchema}.
 */
export type PaginatedMovies = z.infer<typeof PaginatedMovieSchema>;

/**
 * **PaginatedMovieDetails**
 *
 * Represents a paginated result set of {@link MovieDetails} objects.
 * Derived from {@link PaginatedMovieDetailsSchema}.
 */
export type PaginatedMovieDetails = z.infer<typeof PaginatedMovieDetailsSchema>;
