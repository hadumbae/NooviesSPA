/**
 * @file Form value schema for showing detail fields.
 * @filename ShowingFormDetailValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormDetailSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormDetailSchema.ts";

/**
 * Form-compatible values derived from {@link ShowingFormDetailSchema}.
 */
export const ShowingFormDetailValuesSchema = generateFormValueSchema(ShowingFormDetailSchema);

