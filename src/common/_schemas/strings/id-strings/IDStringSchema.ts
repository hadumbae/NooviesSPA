/**
 * @fileoverview Zod schema for validating 24-character MongoDB-style ObjectIDs.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas/strings/simple-strings/StringValueSchema.ts";

/** Zod schema that validates a string is exactly 24 characters long. */
export const IDStringSchema = StringValueSchema.length(24, "ID String must be exactly 24 characters.");

/** Type definition inferred from the ID string schema. */
export type ObjectId = z.infer<typeof IDStringSchema>;