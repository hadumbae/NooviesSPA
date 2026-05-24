/**
 * @fileoverview Validated movie schema with identifier and relational references for the movie domain.
 *
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {DateTimeInstanceSchema} from "@/common/schema/date-time/DateTimeInstanceSchema.ts";
import {UTCDayOnlyDateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCDayOnlyDateTimeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";

import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema, MovieTrailerURLSchema
} from "@/domains/movies/schema/fields";

/** Core Zod schema defining the base structure and constraints of a Movie. */
export const MovieBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: NonEmptyStringSchema.readonly(),

    title: MovieTitleSchema,
    originalTitle: preprocessEmptyStringToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: MovieTaglineSchema.optional(),

    genres: MovieGenreIDsSchema,
    country: ISO3166Alpha2CountryCodeEnum,
    synopsis: MovieSynopsisSchema,
    runtime: PositiveNumberSchema,
    posterImage: CloudinaryImageSchema.optional().nullable(),
    trailerURL: MovieTrailerURLSchema,

    languages: z.array(ISO6391LanguageCodeEnum),
    subtitles: z.array(ISO6391LanguageCodeEnum),
    originalLanguage: ISO6391LanguageCodeEnum,

    releaseDate: z.union([DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema]).optional().nullable(),
    isReleased: CoercedBooleanValueSchema,
    isAvailable: CoercedBooleanValueSchema,
});

/** Final validated Movie schema incorporating release date lifecycle logic. */
export const MovieSchema = MovieBaseSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a validated Movie record with unpopulated genre references. */
export type Movie = z.infer<typeof MovieSchema>;