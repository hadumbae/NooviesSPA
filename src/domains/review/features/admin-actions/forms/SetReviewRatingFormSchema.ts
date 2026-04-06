/**
 * @file Zod validation schema for forms that manually set a movie review rating.
 * @filename SetReviewRatingFormSchema.ts
 */

import {ModerationMessageFormSchema} from "@/common/features/moderation/forms";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {z} from "zod";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";

/**
 * Validates the administrative form data for overriding a review's star rating.
 * ---
 */
export const SetReviewRatingFormSchema = ModerationMessageFormSchema.extend({
    /** The new numeric rating value (0-5) assigned to the review. */
    rating: preprocessEmptyStringToUndefined(
        CoercedNumberValueSchema
            .gte(0, "Must be 0 or more.")
            .lte(5, "Must be 5 or less.")
    ),
});

/** * TypeScript type inferred from {@link SetReviewRatingFormSchema}.
 * Used for typed form handling in the rating moderation dialog.
 */
export type SetReviewRatingFormData = z.infer<typeof SetReviewRatingFormSchema>;