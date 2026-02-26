/**
 * @file Zod schemas for movie review form input.
 * MovieReviewForm.schema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {CoercedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Validation schema for movie review form submission.
 */
export const MovieReviewFormSchema = z.object({
    movie: IDStringSchema,
    reviewText: StringValueSchema
        .max(2000, "Must be 2000 characters or less.")
        .transform(v => v === "" ? undefined : v)
        .optional(),
    rating: preprocessEmptyStringToUndefined(
        CoercedPositiveNumberSchema
            .min(1, "Must be at least 1.")
            .max(5, "Must be no more than 5.")
    ),
    isRecommended: BooleanValueSchema.optional(),
});

/**
 * Form values schema derived from the movie review form schema.
 */
export const MovieReviewFormValuesSchema = generateFormValueSchema(MovieReviewFormSchema);