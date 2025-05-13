import {z, ZodType} from "zod";
import IMovieSubmit from "@/pages/movies/interfaces/IMovieSubmit.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";


/**
 * Zod schema for validating `Movie` submission data.
 *
 * This schema defines the structure and constraints
 * for data submitted when creating or updating a movie.
 */
export const MovieSubmitSchema: ZodType<IMovieSubmit> = z.object({
    title: NonEmptyStringSchema
        .min(1, "Title must be at least 1 character long.")
        .max(1000, "Title must be 1000 characters or less."),

    description: NonEmptyStringSchema
        .trim()
        .max(2000, "Description must be 2000 characters or less."),

    genres: z
        .array(IDStringSchema),

    directors: z
        .array(IDStringSchema),

    cast: z
        .array(IDStringSchema),

    releaseDate: DateStringSchema,

    durationInMinutes: z
        .union([z.literal(""), RequiredNumber])
        .refine(price => price !== "", {message: "Required."})
        .refine(price => price > 0, {message: "Must be greater than 0."}),

    languages: z
        .array(NonEmptyStringSchema)
        .optional(),

    subtitles: z
        .array(NonEmptyStringSchema)
        .optional(),

    trailerURL: z
        .union([z.null(), URLStringSchema])
        .optional(),

    price: z
        .union([z.literal(""), RequiredNumber])
        .refine(price => price !== "", {message: "Required."})
        .refine(price => price > 0, {message: "Must be 0 or greater."}),
});

/**
 * Represents the submission data of a `Movie`
 * object, inferred from `MovieArraySchema`.
 */
export type MovieSubmit = z.infer<typeof MovieSubmitSchema>;

