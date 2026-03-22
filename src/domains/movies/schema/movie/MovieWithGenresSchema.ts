/**
 * @file Validated movie schema for data sets including populated genre objects.
 * @filename MovieWithGenresSchema.ts
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {MovieBaseSchema} from "@/domains/movies/schema/movie/MovieBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {z} from "zod";

import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Extended movie schema where the 'genres' field is expected as full objects.
 * * * **Database Reference:** Adds a readonly {@link IDStringSchema} for the unique identifier.
 * * **Populated Genres:** Utilizes `z.lazy` to resolve {@link GenreSchema}, ensuring
 * the schema remains performant and avoids circular dependency locks during runtime validation.
 */
export const ExtendedMovieWithGenresSchema = MovieBaseSchema.extend({
    /** Unique database identifier. Readonly to prevent schema mutation. */
    _id: IDStringSchema.readonly(),

    /** * Array of fully populated {@link GenreSchema} objects.
     * * @remarks
     * This field expects the resolved documents from a join/population,
     * rather than raw ObjectIDs.
     */
    genres: z.array(z.lazy(() => GenreSchema), {message: "Must be an array of genres."}),
});

/**
 * Validated Movie schema with populated genres and lifecycle refinements.
 * * * **Refinement:** Applies {@link MovieReleaseDateRefinement} to synchronize
 * the `isReleased` status with the logic provided in {@link MovieBaseSchema}.
 */
export const MovieWithGenresSchema = ExtendedMovieWithGenresSchema.superRefine(MovieReleaseDateRefinement);

/**
 * TypeScript type inferred from {@link MovieWithGenresSchema}.
 * * Represents a movie object containing full genre metadata.
 * Use this type for views or components that require genre names/slugs
 * but do not need transactional data like showing counts.
 */
export type MovieWithGenres = z.infer<typeof MovieWithGenresSchema>;