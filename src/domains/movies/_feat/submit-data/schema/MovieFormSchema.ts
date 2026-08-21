/**
 * @fileoverview Zod schemas for validating movie form data and inferring form types for the movie submission feature.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined, preprocessOptionalField} from "@/common/_feat/validation-preprocessors";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {CloudinaryImageSchema} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";
import {AnyValues} from "@/common/_types";
import {IDStringSchema} from "@/common/_schemas";
import {ISO6391LanguageCodeSchema} from "@/common/_schemas/enums/ISO6391LanguageCodeSchema.ts";
import {NonFutureDateStringSchema} from "@/common/_schemas/dates/NonFutureDateStringSchema.ts";
import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema,
    MovieTrailerURLSchema
} from "@/domains/movies/_schema";
import {CoercedPositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/CoercedPositiveNumberSchema";

/** Zod schema for validating movie creation and update forms including conditional release date logic. */
export const MovieFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),

    title: preprocessEmptyToUndefined(MovieTitleSchema),
    originalTitle: preprocessEmptyToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: preprocessOptionalField(MovieTaglineSchema),

    genres: MovieGenreIDsSchema,
    country: preprocessEmptyToUndefined(ISO3166Alpha2CountryCodeSchema),
    synopsis: preprocessEmptyToUndefined(MovieSynopsisSchema),
    runtime: preprocessEmptyToUndefined(CoercedPositiveNumberSchema),
    posterImage: preprocessOptionalField(CloudinaryImageSchema).nullable(),
    trailerURL: preprocessEmptyToUndefined(MovieTrailerURLSchema),

    originalLanguage: preprocessEmptyToUndefined(ISO6391LanguageCodeSchema),
    languages: z.array(ISO6391LanguageCodeSchema).optional(),
    subtitles: z.array(ISO6391LanguageCodeSchema).optional(),

    isReleased: preprocessEmptyToUndefined(CoercedBooleanValueSchema),
    isAvailable: preprocessEmptyToUndefined(CoercedBooleanValueSchema),
    releaseDate: preprocessEmptyToUndefined(NonFutureDateStringSchema.optional()).optional()
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