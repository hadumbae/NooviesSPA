/**
 * @file Validated movie schema with identifier and relational references.
 * @filename MovieSchema.ts
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {MovieBaseSchema} from "@/domains/movies/schema/movie/MovieBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {z} from "zod";

/**
 * Extended movie schema incorporating database identifiers and relational keys.
 * * @remarks
 * Inherits all fields from {@link MovieBaseSchema} and adds:
 * - `_id`: A readonly {@link IDStringSchema} (MongoDB ObjectID).
 * - `genres`: An array of {@link IDStringSchema} representing related genre documents.
 */
export const ExtendedMovieSchema = MovieBaseSchema.extend({
    /** Unique database identifier. Readonly to prevent accidental modification. */
    _id: IDStringSchema.readonly(),

    /** Array of Genre ObjectIDs. Validated to ensure a collection of references. */
    genres: z.array(IDStringSchema, {message: "Must be an array of genre references."}),
});

/**
 * Final validated Movie schema including lifecycle logic.
 * * * **Refinement:** Applies {@link MovieReleaseDateRefinement} to enforce logical
 * consistency between the `releaseDate` value and the `isReleased` flag.
 */
export const MovieSchema = ExtendedMovieSchema.superRefine(MovieReleaseDateRefinement);

/**
 * TypeScript type inferred from {@link MovieSchema}.
 * * Represents a complete Movie record with unpopulated genre references.
 */
export type Movie = z.infer<typeof MovieSchema>;