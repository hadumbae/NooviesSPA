/**
 * @fileoverview Zod validation schema for forms that manually set a movie review rating.
 */

import {z} from "zod";
import {ModerationMessageFormSchema} from "@/common/_feat/moderation/forms";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {AnyValues} from "@/common/types";
import {MovieReviewRatingSchema} from "@/domains/movie-reviews/_schema";

/** Validates the administrative form data for overriding a review's star rating. */
export const SetReviewRatingFormSchema = ModerationMessageFormSchema.extend({
    rating: preprocessEmptyStringToUndefined(MovieReviewRatingSchema),
});

/** Form data type inferred from SetReviewRatingFormSchema. */
export type SetReviewRatingFormData = z.infer<typeof SetReviewRatingFormSchema>;

/** Form values type for the rating moderation form. */
export type SetReviewRatingFormValues = AnyValues<SetReviewRatingFormData>;