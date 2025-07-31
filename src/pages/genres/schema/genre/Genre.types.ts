import {z} from "zod";
import {
    GenreArraySchema,
    GenreDetailsSchema,
    GenreSchema,
    PaginatedGenreDetailsSchema,
    PaginatedGenresSchema
} from "@/pages/genres/schema/genre/Genre.schema.ts";

/**
 * **Genre**
 *
 * Represents a basic genre entity.
 * - `_id`: Unique identifier.
 * - `name`: Name of the genre (3–255 characters).
 * - `description`: Short description (up to 1000 characters).
 */
export type Genre = z.infer<typeof GenreSchema>;

/**
 * **GenreDetails**
 *
 * Represents a genre entity with additional metadata.
 * - Inherits all properties from `Genre`.
 * - `movieCount`: Number of movies associated with the genre.
 */
export type GenreDetails = z.infer<typeof GenreDetailsSchema>;

/**
 * **GenreArray**
 *
 * Represents a list of genres.
 */
export type GenreArray = z.infer<typeof GenreArraySchema>;

/**
 * **PaginatedGenres**
 *
 * Represents a paginated response containing basic genre objects.
 * - Includes pagination metadata (page number, total items, etc.).
 * - Contains an array of `Genre`.
 */
export type PaginatedGenres = z.infer<typeof PaginatedGenresSchema>;

/**
 * **PaginatedGenreDetails**
 *
 * Represents a paginated response containing detailed genre objects.
 * - Includes pagination metadata (page number, total items, etc.).
 * - Contains an array of `GenreDetails`.
 */
export type PaginatedGenreDetails = z.infer<typeof PaginatedGenreDetailsSchema>;