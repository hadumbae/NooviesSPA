/**
 * @fileoverview Type definitions for Genre forms.
 * Differentiates between raw UI state and validated submission data.
 */

import {z} from "zod";
import {GenreFormSchema, GenreFormValuesSchema} from "@/domains/genres/schema/form/GenreForm.schema.ts";

/**
 * Raw values managed by the form state before transformation.
 */
export type GenreFormValues = z.infer<typeof GenreFormValuesSchema>;

/**
 * Validated and transformed Genre data prepared for API submission.
 */
export type GenreForm = z.infer<typeof GenreFormSchema>;