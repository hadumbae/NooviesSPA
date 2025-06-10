import {z} from "zod";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {CloudinaryImageObject} from "@/common/schema/objects/CloudinaryImageObject.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {ISO6391CodeEnum} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";

export const MovieBaseSchema = z.object({
    /**
     * The official title of the movie.
     */
    title: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /**
     * The original title of the movie, if different from the localized title.
     */
    originalTitle: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),

    /**
     * A short optional promotional tagline for the movie.
     */
    tagline: NonEmptyStringSchema.max(100, "Must be 100 characters or less.").optional(),

    /**
     * The ISO 3166-1 alpha-2 country code representing the country where the movie was primarily produced.
     *
     * This should be a valid two-letter uppercase country code (e.g., "US", "FR", "JP").
     */
    country: ISO3166Alpha2CodeEnum,

    /**
     * A longer description or synopsis of the movie's plot.
     */
    synopsis: NonEmptyStringSchema.max(2000, "synopsis must be 2000 characters or less."),

    /**
     * The release date of the movie, formatted as a date string.
     *
     * Expected format: YYYY-MM-DD
     */
    releaseDate: DateStringSchema,

    /**
     * The runtime of the movie in minutes.
     *
     * Must be a number greater than 0.
     */
    runtime: RequiredNumberSchema.gt(0, "Must be greater than 0."),

    /**
     * The ISO 639-1 language code of the movie's original language.
     */
    originalLanguage: ISO6391CodeEnum,

    /**
     * An array of ISO 639-1 codes or names for languages spoken in the movie.
     */
    languages: z.array(ISO6391CodeEnum),

    /**
     * An array of subtitle languages available for the movie.
     */
    subtitles: z.array(ISO6391CodeEnum),

    /**
     * The poster image for the movie, stored as a Cloudinary image object.
     *
     * Can be null or undefined if no poster is available. Defaults to null.
     */
    posterImage: CloudinaryImageObject.optional().nullable().default(null),

    /**
     * A URL to the movie's trailer.
     *
     * Optional and can be null.
     */
    trailerURL: URLStringSchema.optional().nullable(),
});