/**
 * @file Form value schema for showing status fields.
 * @filename ShowingFormStatusValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormStatusSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormStatusSchema.ts";

/**
 * Form-compatible values derived from {@link ShowingFormStatusSchema}.
 */
export const ShowingFormStatusValuesSchema = generateFormValueSchema(ShowingFormStatusSchema);

