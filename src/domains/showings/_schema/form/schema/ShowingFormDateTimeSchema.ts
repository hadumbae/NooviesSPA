/**
 * @fileoverview Zod schema for validating showing start and end date/time form inputs.
 */

import {z} from "zod";
import {TimeStringSchema} from "@/common/_schemas/time/TimeStringSchema.ts";
import {DateOnlyStringSchema} from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {preprocessEmptyToUndefined, preprocessOptionalField} from "@/common/_feat";
import {IANATimezoneSchema} from "@/common/_schemas";

/**
 * Schema for showing date and time inputs that normalizes empty strings to undefined for optional end fields.
 */
export const ShowingFormDateTimeSchema = z.object({
    startAtTime: preprocessEmptyToUndefined(TimeStringSchema),
    startAtDate: preprocessEmptyToUndefined(DateOnlyStringSchema),
    endAtTime: preprocessOptionalField(TimeStringSchema),
    endAtDate: preprocessOptionalField(DateOnlyStringSchema),
    timezone: preprocessEmptyToUndefined(IANATimezoneSchema),
});

/**
 * Inferred type for showing date/time form values.
 */
export type ShowingFormDateTimes = z.infer<typeof ShowingFormDateTimeSchema>;