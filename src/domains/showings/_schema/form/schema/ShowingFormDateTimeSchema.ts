/**
 * @fileoverview Zod schema for validating showing start and end date/time form inputs.
 */

import {z} from "zod";
import {TimeStringSchema} from "@/common/_schemas/time/TimeStringSchema.ts";
import {DateOnlyStringSchema} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";

/**
 * Schema for showing date and time inputs that normalizes empty strings to undefined for optional end fields.
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