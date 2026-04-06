/**
 * @file Type definitions for administrative movie review repository actions.
 * @filename repository.types.ts
 */

import {ModerationMessageFormData} from "@/common/features/moderation/forms";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ResetReviewDisplayNameFormData,
    SetReviewRatingFormData
} from "@/domains/review/features/admin-actions/forms";

/**
 * Configuration for the API request to toggle a review's visibility.
 */
export type PatchToggleReviewPublicityConfig = {
    /** The hex-string identifier of the review being moderated. */
    reviewID: ObjectId;
    /** Standardized moderation justification from the form. */
    data: ModerationMessageFormData;
};

/**
 * Configuration for the API request to update a reviewer's display name.
 */
export type PatchResetReviewDisplayNameConfig = {
    reviewID: ObjectId;
    /** Object containing the new display name and mandatory audit message. */
    data: ResetReviewDisplayNameFormData;
};

/**
 * Configuration for the API request to clear engagement metrics (likes).
 */
export type PatchResetReviewLikesConfig = {
    reviewID: ObjectId;
    /** Standardized moderation justification from the form. */
    data: ModerationMessageFormData;
};

/**
 * Configuration for the API request to manually override a review's rating.
 */
export type PatchSetReviewRatingConfig = {
    reviewID: ObjectId;
    /** Object containing the new numeric rating and mandatory audit message. */
    data: SetReviewRatingFormData;
};