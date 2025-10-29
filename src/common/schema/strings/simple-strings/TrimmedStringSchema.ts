import { z } from "zod";

/**
 * Zod schema for a trimmed string.
 *
 * - Validates that the input is a string.
 * - Automatically trims leading and trailing whitespace.
 * - Throws a required error if the value is empty or missing.
 *
 * @example
 * ```ts
 * const value: TrimmedString = "  hello  "; // becomes "hello"
 * ```
 */
export const TrimmedStringSchema = z
    .string({ required_error: "Required", invalid_type_error: "Must be a string." })
    .trim();

/**
 * TypeScript type inferred from `TrimmedStringSchema`.
 */
export type TrimmedString = z.infer<typeof TrimmedStringSchema>;
