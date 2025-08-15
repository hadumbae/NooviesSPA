import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {RefinedDateStringSchema} from "@/common/schema/dates/RefinedDateStringSchema.ts";
import {ISO6391CodeEnum} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Schema representing raw movie form values as they are initially entered in the UI.
 *
 * These values may not yet be validated or normalized into their final formats
 * and are typically used for form state handling.
 */
export const MovieFormValuesSchema = z.object({
    /** Movie's localized display title. */
    title: FormStarterValueSchema,
    /** Movie's original, unlocalized title. */
    originalTitle: FormStarterValueSchema,
    /** Optional tagline or promotional phrase for the movie. */
    tagline: FormStarterValueSchema,
    /** Country code or name (free-form until validated). */
    country: FormStarterValueSchema,
    /** Short plot synopsis or description. */
    synopsis: FormStarterValueSchema,
    /** Release date string (raw form value, not yet refined). */
    releaseDate: FormStarterValueSchema,
    /** Runtime in minutes (raw form value). */
    runtime: FormStarterValueSchema,
    /** ISO 639-1 language code for the movie's original language (raw). */
    originalLanguage: FormStarterValueSchema,
    /** Optional trailer URL, may be `null` or empty string in the form. */
    trailerURL: FormStarterValueSchema.optional().nullable(),
    /** Array of spoken languages in ISO 639-1 format. */
    languages: z.array(ISO6391CodeEnum),
    /** Array of available subtitle languages in ISO 639-1 format. */
    subtitles: z.array(ISO6391CodeEnum),
    /** Array of genre IDs associated with the movie. */
    genres: z.array(IDStringSchema),
});

/**
 * Schema representing the fully validated and normalized movie form data.
 *
 * This schema extends {@link MovieBaseSchema} with stricter formats and constraints
 * suitable for saving to a database or sending to an API.
 */
export const MovieFormSchema = MovieBaseSchema.extend({
    /** Array of genre IDs (validated as non-empty strings). */
    genres: z.array(IDStringSchema),
    /** Movie release date in refined, validated date string format (YYYY-MM-DD). */
    releaseDate: RefinedDateStringSchema,
    /** Runtime in minutes (must be a positive integer). */
    runtime: CleanedPositiveNumberSchema,
    /** Country of origin as an ISO 3166-1 alpha-2 code. */
    country: ISO3166Alpha2CodeEnum,
    /** Original language as an ISO 639-1 code. */
    originalLanguage: ISO6391CodeEnum,
    /** Optional array of spoken languages (ISO 639-1 codes). */
    languages: z.array(ISO6391CodeEnum).optional(),
    /** Optional array of subtitle languages (ISO 639-1 codes). */
    subtitles: z.array(ISO6391CodeEnum).optional(),
    /**
     * Optional trailer URL.
     * - Empty strings, `null`, or `undefined` are converted to `null`.
     * - Otherwise must be a valid URL string.
     */
    trailerURL: z.preprocess(
        (value: unknown) => (
            (typeof value === "string" && value.trim() === "") ||
            value === null ||
            value === undefined
        ) ? null : value,
        URLStringSchema.optional().nullable(),
    ),
});

