/**
 * @fileoverview Zod schemas for validating movie form data and inferring form types for the movie submission feature.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {CloudinaryImageSchema} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {AnyValues} from "@/common/types";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CoercedPositiveNumberSchema,} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {NonFutureDateStringSchema} from "@/common/schema/dates/NonFutureDateStringSchema.ts";
import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema,
    MovieTrailerURLSchema
} from "@/domains/movies/schema";

/** Zod schema for validating movie creation and update forms including conditional release date logic. */
export const MovieFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),

    title: MovieTitleSchema,
    originalTitle: preprocessEmptyStringToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: MovieTaglineSchema.optional(),

    genres: MovieGenreIDsSchema,
    country: ISO3166Alpha2CountryCodeEnum,
    synopsis: MovieSynopsisSchema,
    runtime: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
    posterImage: CloudinaryImageSchema.optional().nullable(),
    trailerURL: preprocessEmptyStringToUndefined(MovieTrailerURLSchema),

    originalLanguage: ISO6391LanguageCodeEnum,
    languages: z.array(ISO6391LanguageCodeEnum).optional(),
    subtitles: z.array(ISO6391LanguageCodeEnum).optional(),

    isReleased: CoercedBooleanValueSchema,
    isAvailable: CoercedBooleanValueSchema,
    releaseDate: preprocessEmptyStringToUndefined(NonFutureDateStringSchema.optional()).optional()
}).superRefine((values, ctx) => {
    const {releaseDate, isReleased} = values;

    if (isReleased && !releaseDate) {
        ctx.addIssue({
            code: "custom",
            path: ["releaseDate"],
            message: "Required if released.",
        });
    }
});

/** Type inferred from the MovieFormSchema. */
export type MovieFormData = z.infer<typeof MovieFormSchema>;

/** Type representing the initial values for the movie form. */
export type MovieFormStarterValues = AnyValues<MovieFormData>;