/**
 * @fileoverview Defines the validation schema and type for movie titles.
 */
import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating a movie title string. */
export const MovieTitleSchema = NonEmptyStringSchema.max(250, "Max. 250 Chars");

/** Type definition for a valid movie title. */
export type MovieTitle = z.infer<typeof MovieTitleSchema>;