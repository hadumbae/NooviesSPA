/**
 * @fileoverview Zod schema and type definition for UTC ISO 8601 formatted strings.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas/strings";

/** Zod schema for validating UTC ISO 8601 strings ending in 'Z'. */
export const ISO8601StringSchema = StringValueSchema.regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/,
    {message: "Must be a valid UTC ISO 8601 string ending in 'Z'."},
);

/** Type representing a validated UTC ISO 8601 string. */
export type ISO8601String = z.infer<typeof ISO8601StringSchema>;