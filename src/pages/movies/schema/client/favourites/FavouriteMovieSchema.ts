import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {z} from "zod";

/**
 * A Zod schema that extends {@link MovieSchema} by adding a boolean `isFavourite` flag.
 *
 * @remarks
 * - This is useful for representing a user-specific view of a movie,
 *   such as in a personalized watchlist or favorites UI.
 * - The `isFavourite` property indicates whether the current user has marked this movie as a favorite.
 *
 * @example
 * ```ts
 * FavouriteMovieSchema.parse({
 *   title: "Inception",
 *   year: 2010,
 *   director: "Christopher Nolan",
 *   isFavourite: true
 * });
 * ```
 */
export const FavouriteMovieSchema = MovieSchema.extend({
    isFavourite: z.boolean(),
});

/**
 * A TypeScript type representing a movie with an additional `isFavourite` flag.
 *
 * @remarks
 * - Inferred from {@link FavouriteMovieSchema}.
 * - Includes all properties of {@link IMovie} plus a required `isFavourite: boolean`.
 */
export type FavouriteMovie = z.infer<typeof FavouriteMovieSchema>;