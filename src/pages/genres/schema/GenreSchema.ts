import {z, ZodType} from "zod";
import {IDString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import IGenre from "@/pages/genres/interfaces/IGenre.ts";

/**
 * Zod schema for validating a `Genre` object. This schema defines
 * the structure and validation rules for a `Genre` object.
 */
export const GenreSchema: ZodType<IGenre> = z.object({
    _id: IDString,

    name: RequiredString
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: RequiredString
        .max(1000, "Must be 1000 characters or less."),

    movies: z
        .array(z.union([IDString, z.any()])),
});

/**
 * Zod schema for validating an array of `Genre` objects.
 * This schema defines the structure and validation rules
 * for an array of `Genre` objects.
 */
export const GenreArraySchema = z.array(GenreSchema);

/**
 * Represents a single genre object, inferred from `GenreSchema`.
 */
export type Genre = z.infer<typeof GenreSchema>;

/**
 * Represents an array of genre objects, inferred from `GenreArraySchema`.
 */
export type GenreArray = z.infer<typeof GenreArraySchema>;