/**
 * @fileoverview Zod schema for validating date strings that represent current or past dates.
 */

import { DateTime } from "luxon";
import { DateOnlyStringSchema } from "@/common/_schemas/dates/DateOnlyStringSchema.ts";
import {z} from "zod";

/** Validates that a string is a valid date in yyyy-MM-dd format and does not occur in the future. */
export const NonFutureDateStringSchema = DateOnlyStringSchema.superRefine((value, ctx) => {
    const parsedDate = DateTime.fromFormat(value, "yyyy-MM-dd");

    if (!parsedDate.isValid) {
        ctx.addIssue({
            code: "custom",
            path: [],
            message: "Must be a valid date string in the `yyyy-MM-dd` format.",
            fatal: true,
        });
    }

    if (parsedDate > DateTime.now()) {
        ctx.addIssue({
            code: "custom",
            path: [],
            message: "Must be a current or past date.",
            fatal: true,
        });
    }
});

/** A string representing a valid date that is not in the future. */
export type NonFutureDateString = z.infer<typeof NonFutureDateStringSchema>;