/**
 * @file Schema for showing language configuration.
 * @filename ShowingFormLanguageSchema.ts
 */

import {z} from "zod";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";

/**
 * Language configuration with normalization for form input.
 */
export const ShowingFormLanguageSchema = z.object({
    /** Normalized from empty input. */
    language: preprocessEmptyStringToUndefined(ISO6391LanguageCodeEnum),

    /** Requires at least one language. */
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum, {
            required_error: "Required.",
            invalid_type_error: "Must be an array of ISO 639-1 codes.",
        })
        .nonempty({message: "Required."}),
});

/**
 * Inferred type for showing language form values.
 */
export type ShowingFormLanguages = z.infer<typeof ShowingFormLanguageSchema>;