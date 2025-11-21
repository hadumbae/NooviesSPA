/**
 * @file ShowingForm.types.ts
 * @description
 * Provides TypeScript types inferred from the `ShowingForm` Zod schemas.
 * These types ensure type safety across forms and components that consume
 * showing-related data.
 *
 * The types mirror the Zod schemas:
 * - ShowingFormDetails → `ShowingFormDetailSchema`
 * - ShowingFormLanguages → `ShowingFormLanguageSchema`
 * - ShowingFormDateTimes → `ShowingFormDateTimeSchema`
 * - ShowingFormStatuses → `ShowingFormStatusSchema`
 * - ShowingForm → `ShowingFormSchema`
 */

import {z} from "zod";
import {
    ShowingFormDateTimeSchema,
    ShowingFormDetailSchema,
    ShowingFormLanguageSchema,
    ShowingFormSchema,
    ShowingFormStatusSchema
} from "@/pages/showings/schema/form/ShowingForm.schema.ts";

/**
 * Type for basic showing details, including movie, screen, theatre, and optional location.
 */
export type ShowingFormDetails = z.infer<typeof ShowingFormDetailSchema>;

/**
 * Type for showing language information.
 */
export type ShowingFormLanguages = z.infer<typeof ShowingFormLanguageSchema>;

/**
 * Type for showing start and end date/time.
 */
export type ShowingFormDateTimes = z.infer<typeof ShowingFormDateTimeSchema>;

/**
 * Type for showing status information such as ticket price, active/special flags, and status enum.
 */
export type ShowingFormStatuses = z.infer<typeof ShowingFormStatusSchema>;

/**
 * Complete type representing all fields in the showing form.
 */
export type ShowingForm = z.infer<typeof ShowingFormSchema>;
