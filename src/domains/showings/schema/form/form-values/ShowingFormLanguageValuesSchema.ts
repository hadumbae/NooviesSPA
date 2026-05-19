/**
 * @file Form value schema for showing language fields.
 * @filename ShowingFormLanguageValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormLanguageSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormLanguageSchema.ts";

/**
 * Form-compatible values derived from {@link ShowingFormLanguageSchema}.
 */
export const ShowingFormLanguageValuesSchema = generateFormValueSchema(ShowingFormLanguageSchema);

