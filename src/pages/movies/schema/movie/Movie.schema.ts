import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {ISO6391CodeEnum} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {CloudinaryImageObjectSchema} from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Base schema for a movie object.
 * Includes all the essential properties required to create or edit a movie.
 */
export const MovieBaseSchema = z.object({
    /** Movie title (max 1000 characters) */
    title: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /** Original title of the movie (max 1000 characters) */
    originalTitle: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /** Optional tagline for the movie (max 100 characters) */
    tagline: NonEmptyStringSchema.max(100, "Must be 100 characters or less.").optional(),

    /** Country of origin, represented by ISO 3166-1 alpha-2 code */
    country: ISO3166Alpha2CodeEnum,

    /** Movie synopsis (max 2000 characters) */
    synopsis: NonEmptyStringSchema.max(2000, "synopsis must be 2000 characters or less."),

    /** Release date as a string (YYYY-MM-DD) */
    releaseDate: DateStringSchema,

    /** Runtime in minutes, must be greater than 0 */
    runtime: RequiredNumberSchema.gt(0, "Must be greater than 0."),

    /** Original language of the movie (ISO 639-1 code) */
    originalLanguage: ISO6391CodeEnum,

    /** List of languages available in the movie (ISO 639-1 codes) */
    languages: z.array(ISO6391CodeEnum),

    /** List of subtitle languages (ISO 639-1 codes) */
    subtitles: z.array(ISO6391CodeEnum),

    /** Optional poster image object, can be null */
    posterImage: CloudinaryImageObjectSchema.optional().nullable().default(null),

    /** Optional trailer URL, can be null */
    trailerURL: URLStringSchema.optional().nullable(),
});

/**
 * Schema representing a movie with references to genre IDs.
 * Extends MovieBaseSchema.
 */
export const MovieSchema = MovieBaseSchema.extend({
    /** Unique identifier of the movie */
    _id: IDStringSchema.readonly(),

    /** Array of genre IDs associated with the movie */
    genres: z.array(IDStringSchema, { message: "Must be an array of genre references." }),
});

/**
 * Schema for detailed movie information.
 * Includes genre objects and showing count.
 */
export const MovieDetailsSchema = MovieBaseSchema.extend({
    /** Unique identifier of the movie */
    _id: IDStringSchema.readonly(),

    /** Array of full genre objects associated with the movie */
    genres: z.array(z.lazy(() => GenreSchema), { message: "Must be an array of genres." }),

    /** Number of showings for this movie */
    showingCount: NonNegativeNumberSchema,
});

/** Schema for an array of movies */
export const MovieArraySchema = z.array(MovieSchema);

/** Schema for an array of detailed movie objects */
export const MovieDetailsArraySchema = z.array(MovieDetailsSchema);

/** Schema for paginated results of movies */
export const PaginatedMovieSchema = generatePaginationSchema(MovieSchema);

/** Schema for paginated results of detailed movies */
export const PaginatedMovieDetailsSchema = generatePaginationSchema(MovieDetailsSchema);