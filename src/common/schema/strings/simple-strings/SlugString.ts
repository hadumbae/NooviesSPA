/**
 * @file SlugString.ts
 *
 * Zod schema and inferred type for slug strings.
 *
 * Slugs are human-readable, URL-safe identifiers typically derived
 * from entity names and constrained to a reasonable length.
 */

import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/**
 * Schema for slug strings.
 *
 * Constraints:
 * - Non-empty string
 * - Maximum length of 75 characters
 */
export const SlugStringSchema =
    NonEmptyStringSchema.max(75, "Slugs must be no more than 75 characters.");

/**
 * Inferred TypeScript type for {@link SlugStringSchema}.
 */
export type SlugString = z.infer<typeof SlugStringSchema>;
