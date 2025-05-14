import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {CloudinaryImageObject} from "@/common/schema/objects/CloudinaryImageObject.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";

/**
 * Zod schema for validating a `Movie` object.
 *
 * This schema defines the structure and validation rules for a `Movie` object.
 */
export const MovieSchema = z.object({
    _id: IDStringSchema.readonly(),

    title: NonEmptyStringSchema
        .min(1, "Must be at least 1 character long.")
        .max(1000, "Must be 1000 characters or less."),

    originalTitle: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),

    tagline: NonEmptyStringSchema
        .max(100, "Must be 100 characters or less.")
        .optional(),

    country: NonEmptyStringSchema
        .max(100, "Must be 100 characters or less."),

    synopsis: NonEmptyStringSchema
        .trim()
        .max(2000, "synopsis must be 2000 characters or less."),

    genres: z.array(
        z.union([IDStringSchema, z.lazy(() => GenreSchema)]),
    ),

    staff: z.array(
        z.union([IDStringSchema, z.lazy(() => PersonSchema)]),
    ),

    cast: z.array(
        z.union([IDStringSchema, z.lazy(() => PersonSchema)]),
    ),

    releaseDate: DateStringSchema,

    runtime: RequiredNumberSchema
        .gt(0, "Must be greater than 0."),

    originalLanguage: NonEmptyStringSchema
        .max(10, "Must be 10 characters or less."),

    languages: z.array(NonEmptyStringSchema),

    subtitles: z.array(NonEmptyStringSchema),

    posterImage: z.union([
        z.undefined(),
        z.null(),
        CloudinaryImageObject,
    ]),

    trailerURL: z.union([
        z.null(),
        URLStringSchema,
    ]).optional(),

    showings: z.array(z.union([
        IDStringSchema,
        z.lazy(() => ShowingSchema),
    ])),
});

/**
 * Represents a single `Movie` object, inferred from `MovieSchema`.
 */
export type Movie = z.infer<typeof MovieSchema>;

