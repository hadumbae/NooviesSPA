import { z } from "zod";
import { TrimmedStringSchema } from "@/common/schema/strings/simple-strings/TrimmedStringSchema.ts";

/**
 * Zod schema for a non-empty trimmed string.
 *
 * - Validates that the input is a string.
 * - Trims leading and trailing whitespace.
 * - Ensures that the string has at least 1 character.
 * - Throws a "Required" error if empty.
 *
 * @example
 * ```ts
 * const value: NonEmptyString = " hello "; // becomes "hello"
 * ```
 */
export const NonEmptyStringSchema = TrimmedStringSchema
    .min(1, "Required")
    .trim();

/**
 * TypeScript type inferred from `NonEmptyStringSchema`.
 */
export type NonEmptyString = z.infer<typeof NonEmptyStringSchema>;
