/**
 * @fileoverview Defines the validation schema and type for movie titles.
 */
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/** Zod schema for validating a movie title string. */
export const MovieTitleSchema = NonEmptyStringSchema.max(250, "Must be 250 characters or less.");

/** Type definition for a valid movie title. */
export type MovieTitle = z.infer<typeof MovieTitleSchema>;