import {z, ZodType} from "zod";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import {IDString, RequiredString, URLString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {CoercedDate} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {CloudinaryImageObject} from "@/common/schema/CloudinaryImageObject.ts";

/**
 * Zod schema for validating a `Movie` object.
 *
 * This schema defines the structure and validation rules for a `Movie` object.
 */
export const MovieSchema: ZodType<IMovie> = z.object({
    _id: IDString.readonly(),

    title: RequiredString
        .min(1, "Title must be at least 1 character long.")
        .max(1000, "Title must be 1000 characters or less."),

    description: RequiredString
        .trim()
        .max(2000, "Description must be 2000 characters or less."),

    genres: z
        .array(z.union([IDString, z.lazy(() => GenreSchema)])),

    directors: z
        .array(z.union([IDString,z.lazy(() => PersonSchema)])),

    cast: z
        .array(z.union([IDString, z.lazy(() => PersonSchema)])),

    releaseDate: CoercedDate,

    durationInMinutes: RequiredNumber
        .gt(0, "Must be greater than 0."),

    languages: z
        .array(RequiredString),

    subtitles: z
        .array(RequiredString),

    posterImage: z.union([z.null(), CloudinaryImageObject]),

    trailerURL: z
        .union([z.null(), URLString])
        .optional(),

    price: RequiredNumber
        .gte(0, "Must be 0 or greater."),

    showings: z
        .array(z.union([IDString, z.any()])),
});

/**
 * Zod schema for validating an array of `Movie` object.
 *
 * This schema defines the structure and validation rules
 * for an array of `Movie` objects.
 */
export const MovieArraySchema = z.array(MovieSchema);

/**
 * Represents a single `Movie` object, inferred from `MovieSchema`.
 */
export type Movie = z.infer<typeof MovieSchema>;

/**
 * Represents an array of `Movie` object, inferred from `MovieArraySchema`.
 */
export type MovieArray = z.infer<typeof MovieArraySchema>;