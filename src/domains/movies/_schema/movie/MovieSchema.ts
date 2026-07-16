/**
 * @fileoverview Validated movie schema with identifier and relational references for the movie domain.
 *
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/_schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {DateTimeInstanceSchema} from "@/common/_schemas/date-time/DateTimeInstanceSchema.ts";
import {UTCDayOnlyDateTimeSchema} from "@/common/_schemas/date-time/UTCDayOnlyDateTimeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {ISO6391LanguageCodeSchema} from "@/common/_schemas/enums/ISO6391LanguageCodeSchema.ts";
import {CloudinaryImageSchema} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";

import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema, MovieTrailerURLSchema
} from "@/domains/movies/_schema/fields";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Core Zod schema defining the base structure and constraints of a Movie. */
export const MovieBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: NonEmptyStringSchema.readonly(),

    title: MovieTitleSchema,
    originalTitle: preprocessEmptyStringToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: MovieTaglineSchema.optional(),

    genres: MovieGenreIDsSchema,
    country: ISO3166Alpha2CountryCodeSchema,
    synopsis: MovieSynopsisSchema,
    runtime: PositiveNumberSchema,
    posterImage: CloudinaryImageSchema.optional().nullable(),
    trailerURL: MovieTrailerURLSchema,

    languages: z.array(ISO6391LanguageCodeSchema),
    subtitles: z.array(ISO6391LanguageCodeSchema),
    originalLanguage: ISO6391LanguageCodeSchema,

    releaseDate: z.union([DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema]).optional().nullable(),
    isReleased: CoercedBooleanValueSchema,
    isAvailable: CoercedBooleanValueSchema,
});

/** Final validated Movie schema incorporating release date lifecycle logic. */
export const MovieSchema = MovieBaseSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a validated Movie record with unpopulated genre references. */
export type Movie = z.infer<typeof MovieSchema>;