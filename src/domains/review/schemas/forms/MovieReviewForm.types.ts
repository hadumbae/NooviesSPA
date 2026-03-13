/**
 * @file Types for movie review form schemas.
 * MovieReviewForm.types.ts
 */

import {z} from "zod";
import {
    MovieReviewFormSchema,
    MovieReviewFormValuesSchema
} from "@/domains/review/schemas/forms/MovieReviewForm.schema.ts";

/**
 * Inferred type for movie review form input.
 */
export type MovieReviewForm = z.infer<typeof MovieReviewFormSchema>;

/**
 * Inferred type for processed movie review form values.
 */
export type MovieReviewFormValues = z.infer<typeof MovieReviewFormValuesSchema>;