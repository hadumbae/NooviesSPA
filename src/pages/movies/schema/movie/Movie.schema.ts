/**
 * @file Movie.schema.ts
 * Zod schemas for movie domain models and paginated responses.
 */

import { z } from "zod";
import { GenreSchema } from "@/pages/genres/schema/genre/Genre.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import { ISO6391LanguageCodeEnum } from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import { CloudinaryImageSchema } from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import { URLStringSchema } from "@/common/schema/strings/URLStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { UTCDayOnlyDateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import { DateTimeInstanceSchema } from "@/common/schema/date-time/DateTimeInstanceSchema.ts";

/* -------------------------------------------------------------------------------------------------
 * Base Schema
 * ----------------------------------------------------------------------------------------------- */

/**
 * Core movie schema.
 */
export const MovieBaseSchema = z.object({
    title: NonEmptyStringSchema.max(250, "Must be 250 characters or less."),
    originalTitle: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(250, "Must be 250 characters or less.").optional()
    ).optional(),
    tagline: NonEmptyStringSchema.max(100, "Must be 100 characters or less.").optional(),
    country: ISO3166Alpha2CountryCodeEnum,
    synopsis: NonEmptyStringSchema.max(2000, "Synopsis must be 2000 characters or less."),
    releaseDate: z.union([DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema]).optional().nullable(),
    isReleased: CoercedBooleanValueSchema,
    runtime: PositiveNumberSchema,
    originalLanguage: ISO6391LanguageCodeEnum,
    languages: z.array(ISO6391LanguageCodeEnum),
    subtitles: z.array(ISO6391LanguageCodeEnum),
    posterImage: CloudinaryImageSchema.optional().nullable(),
    trailerURL: URLStringSchema.optional().nullable(),
    isAvailable: CoercedBooleanValueSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/* -------------------------------------------------------------------------------------------------
 * Extended Variants
 * ----------------------------------------------------------------------------------------------- */

/**
 * Movie with identifier and genre IDs.
 */
export const ExtendedMovieSchema = MovieBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    genres: z.array(IDStringSchema, { message: "Must be an array of genre references." }),
});

/**
 * Movie with populated genres and showing count.
 */
export const ExtendedMovieDetailsSchema = MovieBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    genres: z.array(z.lazy(() => GenreSchema), { message: "Must be an array of genres." }),
});

/**
 * Movie with populated genres.
 */
export const ExtendedMovieWithGenresSchema = MovieBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    genres: z.array(z.lazy(() => GenreSchema), { message: "Must be an array of genres." }),
});

/* -------------------------------------------------------------------------------------------------
 * Refinement
 * ----------------------------------------------------------------------------------------------- */

/**
 * Requires a release date when marked as released.
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
 * Final Schemas
 * ----------------------------------------------------------------------------------------------- */

/**
 * Movie schema with genre IDs and release validation.
 */
export const MovieSchema = ExtendedMovieSchema.superRefine(dateIfReleased);

/**
 * Detailed movie schema with populated genres and showing count.
 */
export const MovieDetailsSchema = ExtendedMovieDetailsSchema.superRefine(dateIfReleased);

/**
 * Movie schema with populated genres.
 */
export const MovieWithGenresSchema = ExtendedMovieWithGenresSchema.superRefine(dateIfReleased);

/* -------------------------------------------------------------------------------------------------
 * Collections & Pagination
 * ----------------------------------------------------------------------------------------------- */

/** Movie collection schema. */
export const MovieArraySchema = z.array(MovieSchema);

/** Detailed movie collection schema. */
export const MovieDetailsArraySchema = z.array(MovieDetailsSchema);

/** Paginated movies schema. */
export const PaginatedMovieSchema = generatePaginationSchema(MovieSchema);

/** Paginated detailed movies schema. */
export const PaginatedMovieDetailsSchema = generatePaginationSchema(MovieDetailsSchema);