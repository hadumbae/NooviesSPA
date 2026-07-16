/**
 * @fileoverview Validation schemas and types for Genre form submission.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {AnyValues} from "@/common/types";
import {GenreDescriptionSchema, GenreNameSchema} from "@/domains/genres";

/** Zod schema for validating and transforming Genre form data. */
export const GenreFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: GenreNameSchema,
    description: GenreDescriptionSchema,
});

/** Validated Genre data prepared for API submission. */
export type GenreFormData = z.infer<typeof GenreFormSchema>;

/** Raw input values for the Genre form. */
export type GenreFormValues = AnyValues<GenreFormData>;