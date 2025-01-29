import {z, ZodType} from "zod";
import IMovieSubmit from "@/pages/movies/interfaces/IMovieSubmit.ts";
import {IDString, RequiredString, URLString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CoercedDate} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";


/**
 * Zod schema for validating `Movie` submission data.
 *
 * This schema defines the structure and constraints
 * for data submitted when creating or updating a movie.
 */
export const MovieSubmitSchema: ZodType<IMovieSubmit> = z.object({
    title: RequiredString
        .min(1, "Title must be at least 1 character long.")
        .max(1000, "Title must be 1000 characters or less."),

    description: RequiredString
        .trim()
        .max(2000, "Description must be 2000 characters or less."),

    genres: z
        .array(IDString),

    directors: z
        .array(IDString),

    cast: z
        .array(IDString),

    releaseDate: CoercedDate,

    durationInMinutes: z
        .union([z.literal(""), RequiredNumber])
        .refine(price => price !== "", {message: "Required."})
        .refine(price => price > 0, {message: "Must be greater than 0."}),

    languages: z
        .array(RequiredString)
        .optional(),

    subtitles: z
        .array(RequiredString)
        .optional(),

    trailerURL: z
        .union([z.null(), URLString])
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

