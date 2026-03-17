/**
 * @file Composed schema for the showing form.
 * @filename ShowingFormSchema.ts
 */

import {ShowingFormDetailSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormDetailSchema.ts";
import {ShowingFormLanguageSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormLanguageSchema.ts";
import {ShowingFormDateTimeSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormDateTimeSchema.ts";
import {ShowingFormStatusSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormStatusSchema.ts";
import {DateTime} from "luxon";
import {z} from "zod";

/**
 * Combined showing form schema.
 *
 * - Strips theatre location fields from output
 * - Validates chronological order of start/end datetime
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
 * Inferred type for showing form values.
 */
export type ShowingForm = z.infer<typeof ShowingFormSchema>;