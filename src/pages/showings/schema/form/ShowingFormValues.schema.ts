/**
 * @file ShowingFormValues.schema.ts
 * @description
 * Provides Zod schemas for generating **default/starting values** for the Showing form.
 * These schemas are derived from the main ShowingForm schemas but are intended only
 * for initializing form state (e.g., empty strings, false booleans, or empty arrays),
 * not for runtime validation.
 *
 * Uses `generateFormValueSchema` utility to produce a form-friendly schema for each section.
 * The combined `ShowingFormValuesSchema` merges all individual value schemas into a single
 * schema for initializing the complete showing form.
 */

import {
    ShowingFormDateTimeSchema,
    ShowingFormDetailSchema,
    ShowingFormLanguageSchema,
    ShowingFormStatusSchema
} from "@/pages/showings/schema/form/ShowingForm.schema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Default/starting values for showing language fields.
 */
export const ShowingFormLanguageValuesSchema = generateFormValueSchema(ShowingFormLanguageSchema);

/**
 * Default/starting values for showing date and time fields.
 */
export const ShowingFormDateTimeValuesSchema = generateFormValueSchema(ShowingFormDateTimeSchema);

/**
 * Default/starting values for basic showing detail fields.
 */
export const ShowingFormDetailValuesSchema = generateFormValueSchema(ShowingFormDetailSchema);

/**
 * Default/starting values for showing status fields.
 */
export const ShowingFormStatusValuesSchema = generateFormValueSchema(ShowingFormStatusSchema);

/**
 * Full showing form default values schema.
 *
 * @remarks
 * Merges all section value schemas into a single schema suitable for initializing
 * the full showing form with empty or default values.
 */
export const ShowingFormValuesSchema = ShowingFormDetailValuesSchema
    .merge(ShowingFormLanguageValuesSchema)
    .merge(ShowingFormDateTimeValuesSchema)
    .merge(ShowingFormDetailValuesSchema)
    .merge(ShowingFormStatusValuesSchema);
