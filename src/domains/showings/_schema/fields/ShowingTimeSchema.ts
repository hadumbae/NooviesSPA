/**
 * @fileoverview Zod schema and type definition for showing times using DateTime instance or UTC ISO 8601 string.
 */

import {z} from "zod";
import {DateTimeInstanceSchema} from "@/common/_schemas/date-time/DateTimeInstanceSchema.ts";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";

/**
 * Zod schema for validating a showing time using a DateTime instance or UTC ISO 8601 date-time string.
 */
export const ShowingTimeSchema = z.union(
    [DateTimeInstanceSchema, ISO8601DateTimeSchema],
    {message: "Invalid value. Must be a DateTime instance or UTC ISO 8601 date-time string."},
);

/**
 * Inferred showing time type.
 */
export type ShowingTime = z.infer<typeof ShowingTimeSchema>;