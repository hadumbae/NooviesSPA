import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";

/**
 * A Zod schema representing a fully populated movie document that includes:
 * - detailed genre entries,
 * - populated crew and cast credits,
 * - and a list of showings.
 *
 * @remarks
 * This schema extends `MovieBaseSchema` with embedded relationships
 * and credit information. It corresponds to the `IMovieWithData` interface.
 */
export const RawMovieWithDataSchema = MovieBaseSchema.extend({
    /**
     * Unique identifier for the movie document.
     * This is a required, read-only string representing a MongoDB ObjectId.
     */
    _id: IDStringSchema.readonly(),

    /**
     * Array of full genre objects associated with the movie.
     * Each entry conforms to the `GenreSchema`.
     */
    genres: z.array(z.lazy(() => GenreSchema)),

    /**
     * Array of crew member credits associated with the movie.
     * Each entry conforms to the `MovieCreditSchema`.
     */
    crew: z.array(z.lazy(() => MovieCreditSchema)),

    /**
     * Array of cast member credits associated with the movie.
     * Each entry conforms to the `MovieCreditSchema`.
     */
    cast: z.array(z.lazy(() => MovieCreditSchema)),

    /**
     * Array of showings for the movie.
     * Each entry conforms to the `ShowingSchema`.
     */
    showings: z.array(z.lazy(() => ShowingSchema)),
});

/**
 * A typed Zod schema for movies with fully populated genres, cast, crew, and showings.
 *
 * @remarks
 * This schema is explicitly typed to match the `IMovieWithData` interface.
 */
// export const MovieWithDataSchema = RawMovieWithDataSchema as ZodType<IMovieWithData>;
export const MovieWithDataSchema = RawMovieWithDataSchema;

/**
 * TypeScript type representing a fully populated movie object with genre,
 * cast, crew, and showing details.
 *
 * @example
 * ```ts
 * const movie: MovieWithData = {
 *   _id: "abc123",
 *   title: "Interstellar",
 *   genres: [{ _id: "g1", name: "Sci-Fi" }],
 *   crew: [{ _id: "c1", roleType: "CREW", job: "Director", person: { _id: "p1", name: "Nolan" } }],
 *   cast: [{ _id: "c2", roleType: "CAST", characterName: "Cooper", person: { _id: "p2", name: "McConaughey" } }],
 *   showings: [{ _id: "s1", time: "2025-07-01T21:00:00Z" }]
 * };
 * ```
 */
export type MovieWithData = z.infer<typeof MovieWithDataSchema>;

