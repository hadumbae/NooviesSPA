/**
 * @fileoverview Zod validation schema for forms that reset a reviewer's display name.
 */

import {ModerationMessageFormSchema} from "@/common/_feat/moderation/forms";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";
import {AnyValues} from "@/common/types";

/**
 * Zod schema for validating the administrative form data when changing a review's display name.
 */
export const ResetReviewDisplayNameFormSchema = ModerationMessageFormSchema.extend({
    /** The new display name string to be applied to the specific movie review. */
    displayName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(100, "Must be 100 characters or less.")
    ),
});

/** Data structure inferred from the reset review display name schema. */
export type ResetReviewDisplayNameFormData = z.infer<typeof ResetReviewDisplayNameFormSchema>;

/** Form values type for the reset review display name form. */
export type ResetReviewDisplayNameFormValues = AnyValues<ResetReviewDisplayNameFormData>;