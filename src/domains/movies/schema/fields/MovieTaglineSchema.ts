/**
 * @fileoverview Zod schema and type definition for movie taglines.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/** Schema for validating a movie tagline string. */
export const MovieTaglineSchema = NonEmptyStringSchema.max(100, "Must be 100 characters or less.");

/** Type inferred from the MovieTaglineSchema. */
export type MovieTagline = z.infer<typeof MovieTaglineSchema>;