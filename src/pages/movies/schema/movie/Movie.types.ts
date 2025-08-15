import {z} from "zod";
import {
    MovieArraySchema, MovieDetailsArraySchema,
    MovieDetailsSchema,
    MovieSchema, PaginatedMovieDetailsSchema,
    PaginatedMovieSchema
} from "@/pages/movies/schema/movie/Movie.schema.ts";

/**
 * Type representing a movie with basic properties and genre ID references.
 * Derived from {@link MovieSchema}.
 */
export type Movie = z.infer<typeof MovieSchema>;

/**
 * Type representing detailed movie information.
 * Includes full genre objects and showing count.
 * Derived from {@link MovieDetailsSchema}.
 */
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

/**
 * Type representing an array of basic movie objects.
 * Derived from {@link MovieArraySchema}.
 */
export type MovieArray = z.infer<typeof MovieArraySchema>;

/**
 * Type representing an array of detailed movie objects.
 * Derived from {@link MovieDetailsArraySchema}.
 */
export type MovieDetailsArray = z.infer<typeof MovieDetailsArraySchema>;

/**
 * Type representing paginated results of basic movie objects.
 * Derived from {@link PaginatedMovieSchema}.
 */
export type PaginatedMovies = z.infer<typeof PaginatedMovieSchema>;

/**
 * Type representing paginated results of detailed movie objects.
 * Derived from {@link PaginatedMovieDetailsSchema}.
 */
export type PaginatedMovieDetails = z.infer<typeof PaginatedMovieDetailsSchema>;