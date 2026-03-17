/**
 * @file Form value schema for the full showing form.
 * @filename ShowingFormValuesSchema.ts
 */

import {
    ShowingFormDetailValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormDetailValuesSchema.ts";
import {
    ShowingFormLanguageValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormLanguageValuesSchema.ts";
import {
    ShowingFormDateTimeValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormDateTimeValuesSchema.ts";
import {
    ShowingFormStatusValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormStatusValuesSchema.ts";
import {z} from "zod";

/**
 * Form-compatible values composed from all showing form sections.
 */
export const ShowingFormValuesSchema = ShowingFormDetailValuesSchema
    .merge(ShowingFormLanguageValuesSchema)
    .merge(ShowingFormDateTimeValuesSchema)
    .merge(ShowingFormStatusValuesSchema);

/**
 * Inferred type for full showing form values.
 */
export type ShowingFormValues =
    z.infer<typeof ShowingFormValuesSchema>;