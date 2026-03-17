/**
 * @file Date/time schema for showing form inputs.
 * @filename ShowingFormDateTimeSchema.ts
 */

import {z} from "zod";
import {TimeStringSchema} from "@/common/schema/date-time/TimeString.schema.ts";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";

/**
 * Validates start and optional end date/time inputs.
 *
 * - Empty strings are allowed for form compatibility
 * - End fields are normalized to `undefined` when empty
 */
export const ShowingFormDateTimeSchema = z.object({
    startAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .refine((time) => time !== "", {message: "Required."}),

    startAtDate: z
        .union([z.literal(""), DateOnlyStringSchema])
        .refine((date) => date !== "", {message: "Required."}),

    endAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .transform((time) => (time === "" ? undefined : time))
        .optional(),

    endAtDate: z
        .union([z.literal(""), DateOnlyStringSchema])
        .transform((date) => (date === "" ? undefined : date))
        .optional(),
});

/**
 * Inferred type for showing date/time form values.
 */
export type ShowingFormDateTimes = z.infer<typeof ShowingFormDateTimeSchema>;