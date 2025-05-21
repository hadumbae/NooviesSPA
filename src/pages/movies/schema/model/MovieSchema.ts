import {z, ZodType} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

export const RawMovieSchema = MovieBaseSchema.extend({
    /**
     * Unique, read-only identifier for the movie (typically a MongoDB ObjectId as a string).
     */
    _id: IDStringSchema.readonly(),

    /**
     * List of genres associated with the movie.
     *
     * Can be either genre IDs (as strings) or full genre objects.
     */
    genres: z.array(z.union([IDStringSchema, z.lazy(() => GenreSchema)])),

    /**
     * Optional array of crew members involved in the movie's production.
     *
     * Can be either movie credit IDs or full `MovieCreditSchema` objects.
     */
    crew: z.array(z.union([IDStringSchema, z.lazy(() => MovieCreditSchema)])).optional(),

    /**
     * Optional array of cast members who performed in the movie.
     *
     * Can be either movie credit IDs or full `MovieCreditSchema` objects.
     */
    cast: z.array(z.union([IDStringSchema, z.lazy(() => MovieCreditSchema)])).optional(),

    /**
     * Array of showings where the movie is or will be screened.
     *
     * Can include either showing IDs or full `ShowingSchema` objects.
     */
    showings: z.array(z.union([IDStringSchema, z.lazy(() => ShowingSchema)])),
});

export const MovieSchema = RawMovieSchema as ZodType<IMovie>;

/**
 * Inferred TypeScript type from `MovieSchema`.
 *
 * This type reflects the validated shape of a movie object, combining all
 * fields from `MovieBaseSchema` and the extended schema above.
 */
export type Movie = z.infer<typeof MovieSchema>;

