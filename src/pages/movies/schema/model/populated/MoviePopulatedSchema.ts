import {z, ZodType} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import IPopulatedMovie from "@/pages/movies/interfaces/IPopulatedMovie.ts";

/**
 * A Zod schema representing a movie document with fully populated relationships.
 *
 * @remarks
 * This schema is designed for contexts where genre and showing data is fully embedded in the movie object.
 *
 * - `genres` contains full `Genre` objects (not just ID strings).
 * - `showings` contains full `Showing` objects.
 * - `_id` is a required, read-only movie ID.
 */
const RawMoviePopulatedSchema = MovieBaseSchema.extend({
    /** Unique, read-only identifier for the movie document. */
    _id: IDStringSchema.readonly(),

    /** Fully populated list of genre objects. */
    genres: z.array(z.lazy(() => GenreSchema)),

    /** Fully populated list of showing objects. */
    showings: z.array(z.lazy(() => ShowingSchema)),
});

/**
 * A typed Zod schema for movies with fully populated genre and showing relationships.
 *
 * @remarks
 * Cast to `ZodType<IPopulatedMovie>` to align with the `IPopulatedMovie` interface,
 * ensuring consistency and type safety in application code.
 */
export const MoviePopulatedSchema = RawMoviePopulatedSchema as ZodType<IPopulatedMovie>;

/**
 * The inferred TypeScript type representing a movie with embedded (populated) objects for relationships.
 *
 * @example
 * ```ts
 * const movie: PopulatedMovie = {
 *   _id: "abc123",
 *   title: "Arrival",
 *   genres: [{ _id: "g1", name: "Sci-Fi" }],
 *   showings: [{ _id: "s1", time: "2025-06-01T20:00:00Z" }]
 * };
 * ```
 */
export type PopulatedMovie = z.infer<typeof MoviePopulatedSchema>;

