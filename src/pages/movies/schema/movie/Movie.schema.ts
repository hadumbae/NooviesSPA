import { z } from "zod";
import { GenreSchema } from "@/pages/genres/schema/genre/Genre.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CodeEnum } from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import { ISO6391CodeEnum } from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import { CloudinaryImageObjectSchema } from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import { URLStringSchema } from "@/common/schema/strings/URLStringSchema.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ParsedUTCDayOnlyDateStringSchema } from "@/common/schema/dates/ParsedUTCDayOnlyDateStringSchema.ts";
import { RequiredStringSchema } from "@/common/schema/strings/RequiredStringSchema.ts";

/* -------------------------------------------------------------------------------------------------
 * Base Schema
 * ----------------------------------------------------------------------------------------------- */

/**
 * Base schema for a movie object.
 *
 * Defines the core descriptive and metadata fields for a movie,
 * including title information, runtime, language, and availability.
 */
export const MovieBaseSchema = z.object({
    /** Display title of the movie (max 250 characters). */
    title: NonEmptyStringSchema.max(250, "Must be 250 characters or less."),

    /** Original (untranslated) title of the movie (max 250 characters). Optional. */
    originalTitle: RequiredStringSchema
        .max(250, "Must be 250 characters or less.")
        .transform(value => value || undefined)
        .optional(),

    /** Optional tagline or slogan (max 100 characters). */
    tagline: NonEmptyStringSchema.max(100, "Must be 100 characters or less.").optional(),

    /** ISO 3166-1 alpha-2 code for the production country. */
    country: ISO3166Alpha2CodeEnum,

    /** Synopsis or description (max 2000 characters). */
    synopsis: NonEmptyStringSchema.max(2000, "synopsis must be 2000 characters or less."),

    /** Release date in parsed UTC day-only format. Optional and nullable. */
    releaseDate: ParsedUTCDayOnlyDateStringSchema.optional().nullable(),

    /** Whether the movie has been released. */
    isReleased: RequiredBoolean,

    /** Runtime of the movie in minutes (must be positive). */
    runtime: PositiveNumberSchema,

    /** ISO 639-1 code for the movie’s original language. */
    originalLanguage: ISO6391CodeEnum,

    /** Languages available for the movie (ISO 639-1 codes). */
    languages: z.array(ISO6391CodeEnum),

    /** Available subtitle languages (ISO 639-1 codes). */
    subtitles: z.array(ISO6391CodeEnum),

    /** Optional Cloudinary poster image object. Nullable. */
    posterImage: CloudinaryImageObjectSchema.optional().nullable(),

    /** Optional trailer URL. Nullable. */
    trailerURL: URLStringSchema.optional().nullable(),

    /** Whether the movie is currently available (e.g., for streaming). */
    isAvailable: RequiredBoolean,
});

/* -------------------------------------------------------------------------------------------------
 * Extended Variants
 * ----------------------------------------------------------------------------------------------- */

/**
 * Extended movie schema including database identifier and genre references (IDs only).
 */
export const ExtendedMovieSchema = MovieBaseSchema.extend({
    /** Unique string identifier for the movie. */
    _id: IDStringSchema.readonly(),

    /** Array of genre IDs associated with the movie. */
    genres: z.array(IDStringSchema, { message: "Must be an array of genre references." }),
});

/**
 * Extended movie schema with full genre objects and showing count.
 */
export const ExtendedMovieDetailsSchema = MovieBaseSchema.extend({
    /** Unique string identifier for the movie. */
    _id: IDStringSchema.readonly(),

    /** Array of full genre objects associated with the movie. */
    genres: z.array(z.lazy(() => GenreSchema), { message: "Must be an array of genres." }),

    /** Number of showings linked to the movie (non-negative). */
    showingCount: NonNegativeNumberSchema,
});

/**
 * Extended movie schema with full genre objects (without showing count).
 */
export const ExtendedMovieWithGenresSchema = MovieBaseSchema.extend({
    /** Unique string identifier for the movie. */
    _id: IDStringSchema.readonly(),

    /** Array of full genre objects associated with the movie. */
    genres: z.array(z.lazy(() => GenreSchema), { message: "Must be an array of genres." }),
});

/* -------------------------------------------------------------------------------------------------
 * Refinement
 * ----------------------------------------------------------------------------------------------- */

/**
 * Ensures a release date is provided when a movie is marked as released.
 *
 * @param values The movie object being validated.
 * @param ctx Zod refinement context used to report validation issues.
 */
const dateIfReleased = (values: any, ctx: z.RefinementCtx) => {
    const { releaseDate, isReleased } = values;
    if (isReleased && (releaseDate === undefined || releaseDate === null)) {
        ctx.addIssue({
            code: "custom",
            path: ["releaseDate"],
            message: "Required if released.",
        });
    }
};

/* -------------------------------------------------------------------------------------------------
 * Final Schemas (with Refinements)
 * ----------------------------------------------------------------------------------------------- */

/**
 * **MovieSchema**
 *
 * Full movie schema with identifiers and genre IDs, including refinement
 * that requires a release date if `isReleased` is true.
 */
export const MovieSchema = ExtendedMovieSchema.superRefine(dateIfReleased);

/**
 * **MovieDetailsSchema**
 *
 * Detailed movie schema including full genre objects and showing count.
 * Also enforces a release date when `isReleased` is true.
 */
export const MovieDetailsSchema = ExtendedMovieDetailsSchema.superRefine(dateIfReleased);

/**
 * **MovieWithGenresSchema**
 *
 * Movie schema including full genre objects (no showing count),
 * enforcing release-date validation when released.
 */
export const MovieWithGenresSchema = ExtendedMovieWithGenresSchema.superRefine(dateIfReleased);

/* -------------------------------------------------------------------------------------------------
 * Collections & Pagination
 * ----------------------------------------------------------------------------------------------- */

/** Array of {@link MovieSchema} objects. */
export const MovieArraySchema = z.array(MovieSchema);

/** Array of {@link MovieDetailsSchema} objects. */
export const MovieDetailsArraySchema = z.array(MovieDetailsSchema);

/** Paginated result schema for movies using {@link MovieSchema}. */
export const PaginatedMovieSchema = generatePaginationSchema(MovieSchema);

/** Paginated result schema for movies using {@link MovieDetailsSchema}. */
export const PaginatedMovieDetailsSchema = generatePaginationSchema(MovieDetailsSchema);
