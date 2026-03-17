/**
 * @file Form value schema for showing detail fields.
 * @filename ShowingFormDetailValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormDetailSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormDetailSchema.ts";
import {z} from "zod";

/**
 * Form-compatible values derived from {@link ShowingFormDetailSchema}.
 */
export const ShowingFormDetailValuesSchema =
    generateFormValueSchema(ShowingFormDetailSchema);

/**
 * Inferred type for showing detail form values.
 */
export type ShowingFormDetailValues =
    z.infer<typeof ShowingFormDetailValuesSchema>;