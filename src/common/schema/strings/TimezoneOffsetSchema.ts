/**
 * @file Zod schema and type for validating timezone offset strings.
 * @filename TimezoneOffsetSchema.ts
 */

import { StringValueSchema } from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import { z } from "zod";

/**
 * Schema for a timezone offset formatted as `±HH:MM`.
 *
 * Examples: `+07:00`, `-05:30`.
 */
export const TimezoneOffsetSchema = StringValueSchema.regex(/^[+-]\d{2}:\d{2}$/, {
    message: "Invalid timezone offset format. Expected ±HH:MM",
});

/**
 * Type representing a validated timezone offset string.
 */
export type TimezoneOffsetValue = z.infer<typeof TimezoneOffsetSchema>;