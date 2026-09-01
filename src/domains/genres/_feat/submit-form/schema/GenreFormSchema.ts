/**
 * @fileoverview Validation schemas and types for Genre form submission.
 */

import {z} from "zod";
import {CoercedBooleanValueSchema, IDStringSchema} from "@/common/_schemas";
import {AnyValues} from "@/common/_types";
import {GenreDescriptionSchema, GenreNameSchema} from "@/domains/genres";
import {preprocessEmptyToUndefined} from "@/common/_feat";

/** Zod schema for validating and transforming Genre form data. */
export const GenreFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: preprocessEmptyToUndefined(GenreNameSchema),
    description: preprocessEmptyToUndefined(GenreDescriptionSchema),
    isFeatured: preprocessEmptyToUndefined(CoercedBooleanValueSchema),
});

/** Validated Genre data prepared for API submission. */
export type GenreFormData = z.infer<typeof GenreFormSchema>;

/** Raw input values for the Genre form. */
export type GenreFormValues = AnyValues<GenreFormData>;