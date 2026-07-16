/**
 * @fileoverview Zod schema for validating timezone offset strings.
 */

import { z } from "zod";
import { StringValueSchema } from "@/common/_schemas/strings/simple-strings/StringValueSchema.ts";

/** Zod schema for validating timezone offset strings in ±HH:MM format. */
export const TimezoneOffsetSchema = StringValueSchema.regex(/^[+-]\d{2}:\d{2}$/, {
    message: "Invalid timezone offset format. Expected ±HH:MM",
});

/** Type representing a validated timezone offset string. */
export type TimezoneOffsetValue = z.infer<typeof TimezoneOffsetSchema>;