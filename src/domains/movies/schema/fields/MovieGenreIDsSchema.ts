/**
 * @fileoverview Zod schema for validating an array of movie genre identifiers.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Zod schema for an array of genre ID strings. */
export const MovieGenreIDsSchema = z.array(IDStringSchema, {message: "Must be an array of genre IDs."});

/** Type inferred from MovieGenreIDsSchema. */
export type MovieGenreIDs = z.infer<typeof MovieGenreIDsSchema>;
