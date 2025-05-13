import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {CloudinaryImageObject} from "@/common/schema/objects/CloudinaryImageObject.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";

/**
 * Zod schema for validating a `Movie` object.
 *
 * This schema defines the structure and validation rules for a `Movie` object.
 */
export const MovieSchema = z.object({
    _id: IDStringSchema.readonly(),

    title: NonEmptyStringSchema
        .min(1, "Title must be at least 1 character long.")
        .max(1000, "Title must be 1000 characters or less."),

    description: NonEmptyStringSchema
        .trim()
        .max(2000, "Description must be 2000 characters or less."),

    genres: z
        .array(z.union([IDStringSchema, z.lazy(() => GenreSchema)])),

    directors: z
        .array(z.union([IDStringSchema,z.lazy(() => PersonSchema)])),

    cast: z
        .array(z.union([IDStringSchema, z.lazy(() => PersonSchema)])),

    releaseDate: DateStringSchema,

    durationInMinutes: RequiredNumber
        .gt(0, "Must be greater than 0."),

    languages: z
        .array(NonEmptyStringSchema),

    subtitles: z
        .array(NonEmptyStringSchema),

    posterImage: z.union([z.null(), CloudinaryImageObject]),

    trailerURL: z
        .union([z.null(), URLStringSchema])
        .optional(),

    price: RequiredNumber
        .gte(0, "Must be 0 or greater."),

    showings: z
        .array(z.union([IDStringSchema, z.any()])),
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