/**
 * @fileoverview Defines the validation schema for movie trailer URLs.
 */

import {URLStringSchema} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {z} from "zod";

/** Zod schema for an optional and nullable movie trailer URL string. */
export const MovieTrailerURLSchema = URLStringSchema.optional().nullable();

/** Type definition for a movie trailer URL. */
export type MovieTrailerURL = z.infer<typeof MovieTrailerURLSchema>;