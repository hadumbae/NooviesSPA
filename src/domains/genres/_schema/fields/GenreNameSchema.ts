/**
 * @fileoverview Zod validation schema and type definition for genre names.
 */

import {StringValueSchema} from "@/common/_schemas";
import {z} from "zod";

/** Validation schema for a genre name string. */
export const GenreNameSchema = StringValueSchema
    .trim()
    .min(3, "Must be 3 characters or longer.")
    .max(255, "Must be 255 characters or less.");

/** Type inferred from the GenreNameSchema. */
export type GenreName = z.infer<typeof GenreNameSchema>;