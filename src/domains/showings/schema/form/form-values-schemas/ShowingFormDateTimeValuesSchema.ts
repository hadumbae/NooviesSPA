/**
 * @file Form value schema for showing date/time inputs.
 * @filename ShowingFormDateTimeValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {ShowingFormDateTimeSchema} from "@/domains/showings/schema/form/form-schemas/ShowingFormDateTimeSchema.ts";
import {z} from "zod";

/**
 * Form-compatible values derived from {@link ShowingFormDateTimeSchema}.
 */
export const ShowingFormDateTimeValuesSchema =
    generateFormValueSchema(ShowingFormDateTimeSchema);

/**
 * Inferred type for showing date/time form values.
 */
export type ShowingFormDateTimeValues =
    z.infer<typeof ShowingFormDateTimeValuesSchema>;