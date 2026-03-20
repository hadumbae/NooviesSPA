/**
 * @file Core validation schema for Movie domain entities.
 * @filename MovieBaseSchema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {DateTimeInstanceSchema} from "@/common/schema/date-time/DateTimeInstanceSchema.ts";
import {UTCDayOnlyDateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";

/**
 * Base Zod schema defining the core structure and constraints of a Movie.
 */
export const MovieBaseSchema = z.object({
    /** Primary display title. Limited to 250 characters. */
    title: NonEmptyStringSchema.max(250, "Must be 250 characters or less."),

    /** Original title in the source language. Optional. */
    originalTitle: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(250, "Must be 250 characters or less.").optional()
    ).optional(),

    /** Short marketing tagline. Limited to 100 characters. */
    tagline: NonEmptyStringSchema.max(100, "Must be 100 characters or less.").optional(),

    /** Primary production country code. */
    country: ISO3166Alpha2CountryCodeEnum,

    /** Detailed plot summary. Limited to 2000 characters. */
    synopsis: NonEmptyStringSchema.max(2000, "Synopsis must be 2000 characters or less."),

    /** The date the movie was or will be released. */
    releaseDate: z.union([DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema]).optional().nullable(),

    /** Indicates if the movie has passed its release date. */
    isReleased: CoercedBooleanValueSchema,

    /** Length of the movie in minutes. Must be a positive integer. */
    runtime: PositiveNumberSchema,

    /** Primary language code in which the movie was filmed. */
    originalLanguage: ISO6391LanguageCodeEnum,

    /** List of languages available in the audio track. */
    languages: z.array(ISO6391LanguageCodeEnum),

    /** List of languages available for captions/subtitles. */
    subtitles: z.array(ISO6391LanguageCodeEnum),

    /** Validated Cloudinary object for the movie poster. */
    posterImage: CloudinaryImageSchema.optional().nullable(),

    /** Direct link to the movie trailer. */
    trailerURL: URLStringSchema.optional().nullable(),

    /** Administrative flag to control visibility/booking availability. */
    isAvailable: CoercedBooleanValueSchema,

    /** Immutable, SEO-friendly identifier generated from the title. */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Inferred TypeScript type derived from {@link MovieBaseSchema}.
 */
export type MovieBase = z.infer<typeof MovieBaseSchema>;