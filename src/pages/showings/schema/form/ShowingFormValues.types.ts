/**
 * @file ShowingFormValues.types.ts
 * @description
 * Provides TypeScript types inferred from the Showing form **values schemas**.
 * These types represent the shape of default/starting values for the form fields.
 * They are intended for initializing form state and are **not used for runtime validation**.
 *
 * The types correspond to the form value schemas:
 * - `ShowingFormLanguageValues` → `ShowingFormLanguageValuesSchema`
 * - `ShowingFormDateTimeValues` → `ShowingFormDateTimeValuesSchema`
 * - `ShowingFormDetailValues` → `ShowingFormDetailValuesSchema`
 * - `ShowingFormStatusValues` → `ShowingFormStatusValuesSchema`
 * - `ShowingFormValues` → `ShowingFormValuesSchema`
 */

import {z} from "zod";
import {
    ShowingFormDateTimeValuesSchema,
    ShowingFormDetailValuesSchema,
    ShowingFormLanguageValuesSchema,
    ShowingFormStatusValuesSchema,
    ShowingFormValuesSchema
} from "@/pages/showings/schema/form/ShowingFormValues.schema.ts";

/**
 * Type for default/starting values of showing language fields.
 */
export type ShowingFormLanguageValues = z.infer<typeof ShowingFormLanguageValuesSchema>;

/**
 * Type for default/starting values of showing date/time fields.
 */
export type ShowingFormDateTimeValues = z.infer<typeof ShowingFormDateTimeValuesSchema>;

/**
 * Type for default/starting values of basic showing detail fields.
 */
export type ShowingFormDetailValues = z.infer<typeof ShowingFormDetailValuesSchema>;

/**
 * Type for default/starting values of showing status fields.
 */
export type ShowingFormStatusValues = z.infer<typeof ShowingFormStatusValuesSchema>;

/**
 * Type for default/starting values of the full showing form.
 */
export type ShowingFormValues = z.infer<typeof ShowingFormValuesSchema>;
