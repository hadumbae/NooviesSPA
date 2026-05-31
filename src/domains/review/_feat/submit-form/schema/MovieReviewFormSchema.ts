/**
 * @fileoverview Zod validation schemas and inferred types for movie review form submissions.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {AnyValues} from "@/common/types";

/** Validation schema for movie review form submission. */
export const MovieReviewFormSchema = z.object({
    _id: IDStringSchema.optional().nullable(),
    movie: IDStringSchema,
    rating: CleanedPositiveNumberSchema,
    isRecommended: BooleanValueSchema.optional(),
    displayName: NonEmptyStringSchema.max(100, "Must be 500 characters or less."),
    summary: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
    reviewText: StringValueSchema
        .max(2000, "Must be 2000 characters or less.")
        .transform(v => v === "" ? undefined : v)
        .optional(),
});

/** Inferred type for movie review form input. */
export type MovieReviewForm = z.infer<typeof MovieReviewFormSchema>;

/** Inferred type for processed movie review form values. */
export type MovieReviewFormValues = AnyValues<MovieReviewForm>;