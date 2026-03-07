/**
 * @file Zod schema for values representing a UTC ISO-8601 datetime.
 * @filename UTCISO8601ValueSchema.ts
 */

import { z } from "zod";
import { UTCISO8601DateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import { DateTimeInstanceSchema } from "@/common/schema/date-time/DateTimeInstanceSchema.ts";

/**
 * Accepts either a UTC ISO-8601 string or a DateTime instance.
 */
export const UTCISO8601ValueSchema = z.union(
    [UTCISO8601DateTimeSchema, DateTimeInstanceSchema],
    {
        required_error: "Required",
        invalid_type_error: "Must be an UTC ISO-8601 string or a DateTime instance.",
    },
);

/**
 * Value representing a UTC ISO-8601 datetime.
 *
 * @see UTCISO8601ValueSchema
 */
export type UTCISO8601Value = z.infer<typeof UTCISO8601ValueSchema>;