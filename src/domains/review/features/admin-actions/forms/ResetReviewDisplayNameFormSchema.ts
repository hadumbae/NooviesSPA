/**
 * @file Zod validation schema for forms that reset a reviewer's display name.
 * @filename ResetReviewDisplayNameFormSchema.ts
 */

import {ModerationMessageFormSchema} from "@/common/features/moderation/forms";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

/**
 * Validates the administrative form data for changing a review's display name.
 * ---
 */
export const ResetReviewDisplayNameFormSchema = ModerationMessageFormSchema.extend({
    /** The new display name string to be applied to the specific movie review. */
    displayName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(100, "Must be 100 characters or less.")
    ),
});

/**
 * TypeScript type inferred from {@link ResetReviewDisplayNameFormSchema}.
 * Used for typed form handling in the moderation dialog UI.
 */
export type ResetReviewDisplayNameFormData = z.infer<typeof ResetReviewDisplayNameFormSchema>;