import {z, ZodType} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import IReferenceMovie from "@/pages/movies/interfaces/IReferenceMovie.ts";


/**
 * A Zod schema representing a minimal movie document where all relationships are ID strings.
 *
 * @remarks
 * This schema is suitable for contexts where only references are needed (e.g., database writes or ID-only views).
 *
 * - `genres` is a required array of genre IDs (`string`).
 * - `showings` is a required array of showing IDs (`string`).
 * - `_id` is a required, read-only movie ID (`string`).
 */
export const RawMovieReferenceSchema = MovieBaseSchema.extend({
    /** Unique, read-only identifier for the movie document. */
    _id: IDStringSchema.readonly(),

    /** An array of genre IDs (as strings). Populated genre objects are not allowed. */
    genres: z.array(IDStringSchema, {message: "Must be an array of IDs."}),

    /** An array of showing IDs (as strings). Populated showing objects are not allowed. */
    showings: z.array(IDStringSchema, {message: "Must be an array of IDs."}),
});

/**
 * A typed Zod schema for reference-only movie objects.
 *
 * @remarks
 * Cast to `ZodType<IReferenceMovie>` to enforce structural alignment with the `IReferenceMovie` interface,
 * ensuring strong typing during parsing and validation.
 */
export const MovieReferenceSchema = RawMovieReferenceSchema as ZodType<IReferenceMovie>;

/**
 * The inferred TypeScript type representing a movie with only reference IDs for relationships.
 *
 * @example
 * ```ts
 * const movie: ReferenceMovie = {
 *   _id: "abc123",
 *   title: "Inception",
 *   genres: ["g1", "g2"],
 *   showings: ["s1", "s2"]
 * };
 * ```
 */
export type ReferenceMovie = z.infer<typeof MovieReferenceSchema>;

