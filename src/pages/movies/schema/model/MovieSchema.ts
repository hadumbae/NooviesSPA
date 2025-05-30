import {z, ZodType} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

/**
 * A Zod schema representing a movie with potentially unpopulated or partially populated references.
 *
 * @remarks
 * This schema extends the base movie schema and adds the `_id`, `genres`, and `showings` fields.
 *
 * - `genres` is an array of either string IDs or fully populated genre objects.
 * - `showings` is an array of either string IDs or fully populated showing objects.
 *
 * These unions allow the schema to validate both raw database documents (with IDs)
 * and hydrated/populated objects returned from queries with Mongoose `.populate()` or custom aggregations.
 */
export const RawMovieSchema = MovieBaseSchema.extend({
    /** Unique, read-only identifier for the movie document. */
    _id: IDStringSchema.readonly(),

    /** Array of genre references, which may be raw ObjectId strings or populated genre objects. */
    genres: z.array(z.union([IDStringSchema, z.lazy(() => GenreSchema)])),

    /** Array of showing references, which may be raw ObjectId strings or populated showing objects. */
    showings: z.array(z.union([IDStringSchema, z.lazy(() => ShowingSchema)])),
});

/**
 * A strongly typed Zod schema conforming to the `IMovie` interface.
 *
 * @remarks
 * This cast enforces compatibility between the `RawMovieSchema` and the app's domain interface for movies.
 * It assumes that the schema shape is already aligned with the expected type structure in `IMovie`.
 */
export const MovieSchema = RawMovieSchema as ZodType<IMovie>;

/**
 * The inferred TypeScript type from the validated `MovieSchema`.
 *
 * This represents a movie object that may contain a mix of ID strings and fully populated documents
 * for `genres` and `showings`.
 */
export type Movie = z.infer<typeof MovieSchema>;

