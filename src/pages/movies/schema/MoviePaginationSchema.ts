import {z} from "zod";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Zod schema for validating a paginated response of movies.
 *
 * This schema defines the structure of paginated movie data received
 * from an API. It includes the total number of items and the list of movies
 * on the current page.
 */
export const PaginatedMovieSchema = generatePaginationSchema(MovieSchema);

/**
 * Represents the TypeScript type inferred from `PaginatedMoviesSchema`.
 *
 * This type is used to enforce the structure of paginated movie data
 * throughout the application.
 */
export type PaginatedMovies = z.infer<typeof PaginatedMovieSchema>;