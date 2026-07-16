/**
 * @fileoverview Zod schema for validating and transforming ISO-8601 strings into Luxon DateTime objects.
 */

import {DateTime} from "luxon";
import {
    ISO8601StringSchema
} from "@/common/_schemas/iso-8601/ISO8601StringSchema.ts";
import {z} from "zod";

/** Zod schema that transforms an ISO-8601 string into a validated Luxon DateTime instance in UTC. */
export const ISO8601DateTimeSchema = ISO8601StringSchema
    .transform((dateString) => DateTime.fromISO(dateString, {zone: "UTC"}) as DateTime<true>)
    .refine((date) => date.isValid, { message: "Invalid Luxon DateTime produced." });

/** Type representing a validated Luxon DateTime instance. */
export type ISO8601DateTime = z.infer<typeof ISO8601DateTimeSchema>;