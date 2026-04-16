/**
 * @fileoverview Validation schemas for Genre forms.
 * Handles both raw UI input and transformed submission data.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates and transforms data for API submission.
 * Includes character constraints and optional ID for updates.
 */
export const GenreFormSchema = z.object({
    /** Optional identifier for update operations. */
    _id: IDStringSchema.optional(),

    /** 3-255 characters. */
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    /** Max 1000 characters. */
    description: NonEmptyStringSchema
        .max(1000, "Must be 1000 characters or less."),
});

/**
 * Validated and transformed Genre data prepared for API submission.
 */
export type GenreFormData = z.infer<typeof GenreFormSchema>;