import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {RefinedDateStringSchema} from "@/common/schema/dates/RefinedDateStringSchema.ts";
import {RefinedNumberSchema} from "@/common/schema/numbers/RefinedNumberSchema.ts";

/**
 * Zod schema for validating `Movie` submission data.
 *
 * This schema defines the structure and constraints
 * for data submitted when creating or updating a movie.
 */
export const MovieSubmitSchema = z.object({
    title: NonEmptyStringSchema
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
        .max(2000, "Must be 2000 characters or less."),

    genres: z.array(IDStringSchema),

    staff: z.array(IDStringSchema),

    cast: z.array(IDStringSchema),

    releaseDate: RefinedDateStringSchema,

    runtime: RefinedNumberSchema
        .refine(
            runtime => runtime && runtime > 0,
            {message: "Must be greater than 0."}
        ),

    originalLanguage: NonEmptyStringSchema
        .max(10, "Must be 10 characters or less."),

    languages: z
        .array(NonEmptyStringSchema)
        .optional(),

    subtitles: z
        .array(NonEmptyStringSchema)
        .optional(),

    trailerURL: z
        .union([z.null(), URLStringSchema])
        .optional(),
});

/**
 * Represents the submission data of a `Movie`
 * object, inferred from `MovieArraySchema`.
 */
export type MovieSubmit = z.infer<typeof MovieSubmitSchema>;

