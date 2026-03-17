/**
 * @file Form value schema for showing status fields.
 * @filename ShowingFormStatusValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormStatusSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormStatusSchema.ts";
import {z} from "zod";

/**
 * Form-compatible values derived from {@link ShowingFormStatusSchema}.
 */
export const ShowingFormStatusValuesSchema =
    generateFormValueSchema(ShowingFormStatusSchema);

/**
 * Inferred type for showing status form values.
 */
export type ShowingFormStatusValues =
    z.infer<typeof ShowingFormStatusValuesSchema>;