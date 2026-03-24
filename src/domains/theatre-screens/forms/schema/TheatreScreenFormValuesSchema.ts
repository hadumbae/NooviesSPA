/**
 * @file Zod validation schema and type definitions for initializing Theatre Screen form states.
 * @filename TheatreScreenFormValuesSchema.ts
 */

import {z} from "zod";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {TheatreScreenFormSchema} from "@/domains/theatre-screens/forms";

/**
 * Zod schema representing the raw, potentially incomplete state of a Theatre Screen form.
 */
export const TheatreScreenFormValuesSchema = generateFormValueSchema(TheatreScreenFormSchema);

/**
 * TypeScript type representing the initial or "in-progress" values of a Theatre Screen form.
 */
export type TheatreScreenFormValues = z.infer<typeof TheatreScreenFormValuesSchema>;