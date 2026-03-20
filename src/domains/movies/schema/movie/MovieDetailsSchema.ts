/**
 * @file Validated movie schema for detailed views, including populated relations.
 * @filename MovieDetailsSchema.ts
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {MovieBaseSchema} from "@/domains/movies/schema/movie/MovieBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {z} from "zod";
import {GenreSchema} from "@/domains/genres/schema/genre/Genre.schema.ts";

/**
 * Extended movie schema where relational IDs are replaced with full objects.
 * * * **Database Reference:** Adds a readonly {@link IDStringSchema} for the primary key.
 * * **Populated Genres:** Uses `z.lazy` to resolve {@link GenreSchema}, preventing
 * circular dependency issues while providing full genre metadata (e.g., names, slugs).
 */
export const ExtendedMovieDetailsSchema = MovieBaseSchema.extend({
    /** Unique database identifier. Readonly to prevent mutation. */
    _id: IDStringSchema.readonly(),

    /** * Array of fully populated {@link GenreSchema} objects.
     * * @remarks
     * Unlike the base schema which uses ObjectIDs, this schema expects the
     * complete genre document as returned by a join or population operation.
     */
    genres: z.array(z.lazy(() => GenreSchema), {message: "Must be an array of genres."}),
});

/**
 * Detailed movie schema incorporating populated genres and date refinements.
 * * * **Refinement:** Applies {@link MovieReleaseDateRefinement} to ensure the
 * `isReleased` boolean correctly reflects the state of the `releaseDate`.
 */
export const MovieDetailsSchema = ExtendedMovieDetailsSchema.superRefine(MovieReleaseDateRefinement);

/**
 * TypeScript type inferred from {@link MovieDetailsSchema}.
 * * Represents a "Read-Heavy" movie object typically used for Movie Detail pages
 * where genres and other relational data must be rendered immediately.
 */
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;