import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {NonFutureDateStringSchema} from "@/common/schema/dates/NonFutureDateStringSchema.ts";
import refineToRequire from "@/common/utility/schemas/refineToRequire.ts";
import {EmptyStringSchema} from "@/common/schema/strings/simple-strings/EmptyStringSchema.ts";

/**
 * Schema representing the raw values used in the movie form.
 * Includes starter values and optional arrays for languages, subtitles, and genres.
 */
export const MovieFormValuesSchema = z.object({
    /** The main title of the movie */
    title: FormStarterValueSchema,
    /** The original title (if different) */
    originalTitle: FormStarterValueSchema,
    /** The tagline of the movie */
    tagline: FormStarterValueSchema,
    /** Country of production */
    country: FormStarterValueSchema,
    /** Synopsis or summary of the movie */
    synopsis: FormStarterValueSchema,
    /** Release date of the movie */
    releaseDate: FormStarterValueSchema,
    /** Whether the movie has been released */
    isReleased: FormStarterValueSchema,
    /** Runtime of the movie in minutes */
    runtime: FormStarterValueSchema,
    /** Original language code of the movie */
    originalLanguage: FormStarterValueSchema,
    /** Optional URL to the movie trailer */
    trailerURL: FormStarterValueSchema.optional().nullable(),
    /** Array of spoken languages in ISO 639-1 codes */
    languages: z.array(ISO6391LanguageCodeEnum),
    /** Array of subtitle languages in ISO 639-1 codes */
    subtitles: z.array(ISO6391LanguageCodeEnum),
    /** Array of genre IDs */
    genres: z.array(IDStringSchema),
    /** Whether the movie is currently available */
    isAvailable: FormStarterValueSchema,
});

/**
 * Schema for validating a movie form.
 * Extends `MovieBaseSchema` and adds specific constraints for the form:
 * - `genres` must be an array of valid IDs.
 * - `releaseDate` must be either a valid non-future date or empty if the movie is not released.
 * - `runtime` must be a positive number.
 * - Optional arrays for `languages` and `subtitles`.
 * - `trailerURL` is preprocessed to normalize empty strings, null, or undefined to null.
 *
 * The `superRefine` enforces that `releaseDate` is required if `isReleased` is true.
 */
export const MovieFormSchema = MovieBaseSchema.omit({slug: true}).extend({
    /** Array of genre IDs */
    genres: z.array(IDStringSchema, {message: "Must be an array of genre IDs."}),

    /**
     * The release date of the movie.
     * - Must be a non-future date string if provided.
     * - Can be undefined or an empty string if the movie is not released.
     */
    releaseDate: z.union(
        [refineToRequire(EmptyStringSchema), NonFutureDateStringSchema],
        {message: "Must be a non-future date or empty."},
    ),

    /** Runtime of the movie in minutes */
    runtime: CleanedPositiveNumberSchema,

    /** Array of spoken language ISO 639-1 codes (optional) */
    languages: z.array(ISO6391LanguageCodeEnum).optional(),

    /** Array of subtitle language ISO 639-1 codes (optional) */
    subtitles: z.array(ISO6391LanguageCodeEnum).optional(),

    /**
     * Optional trailer URL.
     * Empty strings, null, or undefined are normalized to null.
     */
    trailerURL: z.preprocess(
        (value: unknown) =>
            (typeof value === "string" && value.trim() === "") ||
            value === null ||
            value === undefined ? null : value,
        URLStringSchema.optional().nullable(),
    ),
}).superRefine((values, ctx) => {
    const {releaseDate, isReleased} = values;

    // Enforce that releaseDate is present if the movie is marked as released
    if (isReleased && (releaseDate === undefined || releaseDate === null || releaseDate === "")) {
        ctx.addIssue({
            code: "custom",
            path: ["releaseDate"],
            message: "Required if released.",
        });
    }
});