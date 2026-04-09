/**
 * @file Zod schema and type for transforming UTC ISO 8601 strings into Luxon DateTime instances.
 * @filename UTCISO8601DateTimeSchema.ts
 */

import {DateTime} from "luxon";
import {
    UTCISO8601StringSchema
} from "@/common/schema/date-time/iso-8601/UTCISO8601StringSchema.ts";
import {z} from "zod";

/**
 * A Zod schema that validates a UTC string and transforms it into a Luxon DateTime instance.
 * ---
 */
export const UTCISO8601DateTimeSchema = UTCISO8601StringSchema
    .transform((dateString) => DateTime.fromISO(dateString) as DateTime<true>)
    .refine((date) => date.isValid, { message: "Invalid Luxon DateTime produced." });

/**
 * TypeScript type inferred from {@link UTCISO8601DateTimeSchema}.
 * ---
 */
export type UTCISO8601DateTime = z.infer<typeof UTCISO8601DateTimeSchema>;