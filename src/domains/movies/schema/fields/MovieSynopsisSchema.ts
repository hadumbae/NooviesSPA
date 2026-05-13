/**
 * @fileoverview Zod schema and type definition for movie synopsis validation.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/** Schema for validating movie synopsis strings with a maximum length. */
export const MovieSynopsisSchema = NonEmptyStringSchema.max(2000, "Synopsis must be 2000 characters or less.");

/** Type inferred from the MovieSynopsisSchema. */
export type MovieSynopsis = z.infer<typeof MovieSynopsisSchema>;