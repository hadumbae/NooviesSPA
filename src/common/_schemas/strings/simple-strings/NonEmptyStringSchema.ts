/**
 * @fileoverview Zod schema for validating non-empty trimmed strings.
 */

import {z} from "zod";
import {TrimmedStringSchema} from "@/common/_schemas/strings/simple-strings/TrimmedStringSchema.ts";

/**
 * Schema that trims whitespace and ensures the string has at least one character.
 */
export const NonEmptyStringSchema = TrimmedStringSchema.min(1, "Min. 1 Char");

/** TypeScript type inferred from NonEmptyStringSchema. */
export type NonEmptyString = z.infer<typeof NonEmptyStringSchema>;
