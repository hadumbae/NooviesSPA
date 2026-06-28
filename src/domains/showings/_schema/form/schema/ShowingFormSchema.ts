/**
 * @fileoverview Composed schema for the showing form.
 *
 * @filename ShowingFormSchema.ts
 */

import {ShowingFormDetailSchema} from "@/domains/showings/_schema/form/schema/ShowingFormDetailSchema.ts";
import {ShowingFormLanguageSchema} from "@/domains/showings/_schema/form/schema/ShowingFormLanguageSchema.ts";
import {ShowingFormDateTimeSchema} from "@/domains/showings/_schema/form/schema/ShowingFormDateTimeSchema.ts";
import {ShowingFormStatusSchema} from "@/domains/showings/_schema/form/schema/ShowingFormStatusSchema.ts";
import {DateTime} from "luxon";
import {z} from "zod";

/**
 * Combined showing form schema that strips location fields and validates
 * chronological order of start and end times.
 */
export const ShowingFormSchema = ShowingFormDetailSchema
    .merge(ShowingFormLanguageSchema)
    .merge(ShowingFormDateTimeSchema)
    .merge(ShowingFormStatusSchema)
    .transform(({theatreCity, theatreState, theatreCountry, ...rest}) => rest)
    .superRefine((values, ctx) => {
        const {startAtTime, startAtDate, endAtTime, endAtDate} = values;

        if (endAtDate && endAtTime) {
            const start = DateTime.fromISO(`${startAtDate}T${startAtTime}`);
            const end = DateTime.fromISO(`${endAtDate}T${endAtTime}`);

            if (end < start) {
                const message = "End must not be earlier.";
                ctx.addIssue({code: "custom", path: ["endAtDate"], message});
                ctx.addIssue({code: "custom", path: ["endAtTime"], message});
                return z.NEVER;
            }
        }
    });

/**
 * Inferred type for showing form data.
 */
export type ShowingFormData = z.infer<typeof ShowingFormSchema>;