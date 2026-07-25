/**
 * @fileoverview Zod schema and type definition for moderation log messages.
 */

import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating a moderation log message string. */
export const ModerationLogMessageSchema = NonEmptyStringSchema.max(500, "Max. 500 Chars");

/** Type inferred from the ModerationLogMessageSchema. */
export type ModerationLogMessage = z.infer<typeof ModerationLogMessageSchema>;