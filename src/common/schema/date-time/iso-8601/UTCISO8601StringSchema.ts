/**
 * @file Zod schema and type for strict UTC ISO 8601 timestamp strings.
 * @filename UTCISO8601StringSchema.ts
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";

/**
 * Zod schema that validates strings formatted as strict UTC ISO 8601 timestamps.
 * ---
 */
export const UTCISO8601StringSchema = StringValueSchema.regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    { message: "Must be a valid UTC ISO 8601 string ending in 'Z'." },
);

/**
 * TypeScript type inferred from {@link UTCISO8601StringSchema}.
 */
export type UTCISO8601String = z.infer<typeof UTCISO8601StringSchema>;