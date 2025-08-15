import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {z, ZodType} from "zod";
import IFavouriteMovie from "@/pages/movies/interfaces/IFavouriteMovie.ts";

/**
 * A Zod schema that extends the base {@link MovieSchema} with additional
 * fields used to represent a user's favourited movie.
 *
 * This raw version does not yet enforce full runtime type safety via {@link ZodType},
 * and is typically used for schema composition.
 */
export const RawFavouriteMovieSchema = MovieSchema.extend({
    /**
     * Indicates whether the movie has been marked as a favourite by the user.
     */
    isFavourite: z.boolean(),
});

/**
 * A fully-typed Zod schema representing a user's favourited movie,
 * conforming to the {@link IFavouriteMovie} interface.
 *
 * Casts the {@link RawFavouriteMovieSchema} to a {@link ZodType} to support
 * circular references and enforce structural typing against the `IFavouriteMovie` contract.
 */
export const FavouriteMovieSchema = RawFavouriteMovieSchema as ZodType<IFavouriteMovie>;

/**
 * TypeScript type inferred from {@link FavouriteMovieSchema}.
 *
 * Represents the runtime-validated structure of a favourited movie object.
 */
export type FavouriteMovie = z.infer<typeof FavouriteMovieSchema>;