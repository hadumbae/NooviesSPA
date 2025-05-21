import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";

/**
 * Fully populated movie schema with embedded related data.
 *
 * This schema extends {@link MovieBaseSchema} and replaces ID references
 * (e.g., genre IDs, movie credit IDs) with their full object counterparts.
 * It is ideal for use in fully hydrated responses such as those used in:
 * - Admin dashboards
 * - Public-facing detail pages
 * - SSR rendering contexts
 *
 * The following properties are fully populated with embedded schemas:
 * - {@link GenreSchema}
 * - {@link MovieCreditSchema}
 * - {@link ShowingSchema}
 */
export const MoviePopulatedSchema = MovieBaseSchema.extend({
    /**
     * Unique, read-only identifier for the movie.
     * Typically a MongoDB ObjectId represented as a string.
     */
    _id: IDStringSchema.readonly(),

    /**
     * Array of genres as fully populated {@link GenreSchema} objects.
     */
    genres: z.array(z.lazy(() => GenreSchema)),

    /**
     * Array of crew members as fully populated {@link MovieCreditSchema} objects.
     */
    crew: z.array(z.lazy(() => MovieCreditSchema)),

    /**
     * Array of cast members as fully populated {@link MovieCreditSchema} objects.
     */
    cast: z.array(z.lazy(() => MovieCreditSchema)),

    /**
     * Array of showings as fully populated {@link ShowingSchema} objects.
     */
    showings: z.array(z.lazy(() => ShowingSchema)),
});

/**
 * Inferred TypeScript type representing a fully populated movie entity.
 *
 * Equivalent to the validated shape of {@link MoviePopulatedSchema}, including:
 * - Embedded genres via {@link GenreSchema}
 * - Embedded cast/crew via {@link MovieCreditSchema}
 * - Embedded showings via {@link ShowingSchema}
 */
export type PopulatedMovie = z.infer<typeof MoviePopulatedSchema>;

