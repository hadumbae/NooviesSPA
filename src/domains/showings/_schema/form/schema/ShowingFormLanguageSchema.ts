/**
 * @fileoverview Zod schema for validating showing language configurations in forms.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {ISO6391LanguageCodeSchema} from "@/common/_schemas/enums/ISO6391LanguageCodeSchema.ts";

/** Schema for showing language configuration with normalization for form input. */
export const ShowingFormLanguageSchema = z.object({
    language: preprocessEmptyStringToUndefined(ISO6391LanguageCodeSchema),
    subtitleLanguages: z
        .array(ISO6391LanguageCodeSchema, {
            required_error: "Required.",
            invalid_type_error: "Must be an array of ISO 639-1 codes.",
        })
        .nonempty({message: "Required."}),
});

/** Inferred type for showing language form values. */
export type ShowingFormLanguages = z.infer<typeof ShowingFormLanguageSchema>;