/**
 * @fileoverview Zod schema and inferred type for URL-safe slug strings.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas/strings";

/** Schema for non-empty strings with a maximum length of 75 characters. */
export const SlugStringSchema = NonEmptyStringSchema.max(75, "Max. 75 Chars");

/**
 * Inferred TypeScript type for SlugStringSchema.
 */
export type SlugString = z.infer<typeof SlugStringSchema>;
