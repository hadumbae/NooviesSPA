import {z} from "zod";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";

/**
 * Zod schema for validating an array of `Movie` object.
 *
 * This schema defines the structure and validation rules
 * for an array of `Movie` objects.
 */
export const MovieArraySchema = z.array(MovieSchema);

/**
 * Represents an array of `Movie` object, inferred from `MovieArraySchema`.
 */
export type MovieArray = z.infer<typeof MovieArraySchema>;