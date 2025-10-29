import {z} from "zod";
import {ExtendedMovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Schema for a movie with user-specific favourite status.
 *
 * Extends {@link ExtendedMovieSchema} by adding:
 * - `isFavourite`: A required boolean indicating whether the movie is marked as a favourite by the user.
 */
export const FavouriteMovieSchema = ExtendedMovieSchema.extend({
    /** Whether the movie is marked as a favourite by the user. */
    isFavourite: CoercedBooleanValueSchema,
});

/**
 * Inferred TypeScript type for {@link FavouriteMovieSchema}.
 *
 * Represents a movie with all base movie fields plus the `isFavourite` flag.
 *
 * @example
 * ```ts
 * const fav: FavouriteMovie = {
 *   _id: "abc123",
 *   title: "Inception",
 *   originalTitle: "Inception",
 *   tagline: "Your mind is the scene of the crime.",
 *   country: "US",
 *   synopsis: "A thief who steals corporate secrets...",
 *   releaseDate: "2010-07-16",
 *   isReleased: true,
 *   runtime: 148,
 *   originalLanguage: "en",
 *   languages: ["en"],
 *   subtitles: ["en", "es"],
 *   isAvailable: true,
 *   genres: ["sci-fi", "thriller"],
 *   isFavourite: true
 * };
 * ```
 */
export type FavouriteMovie = z.infer<typeof FavouriteMovieSchema>;