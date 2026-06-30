/**
 * @fileoverview Zod schema and type definition for genre descriptions.
 */

import {StringValueSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating genre description strings. */
export const GenreDescriptionSchema = StringValueSchema
    .trim()
    .min(1, "Must Not Be Empty")
    .max(1000, "Max. 1000 Chars");

/** Type inferred from the GenreDescriptionSchema. */
export type GenreDescription = z.infer<typeof GenreDescriptionSchema>;