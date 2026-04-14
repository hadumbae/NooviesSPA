/**
 * @fileoverview Validation schemas for Genre forms.
 * Handles both raw UI input and transformed submission data.
 */

import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates raw form state before processing.
 */
export const GenreFormValuesSchema = z.object({
    name: FormStarterValueSchema,
    description: FormStarterValueSchema,
});

/**
 * Validates and transforms data for API submission.
 */
export const GenreFormSchema = z.object({
    _id: IDStringSchema.optional(),

    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),
});