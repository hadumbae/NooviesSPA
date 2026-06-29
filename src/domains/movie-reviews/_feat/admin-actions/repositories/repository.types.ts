/**
 * @fileoverview Type definitions for administrative movie review repository actions.
 */

import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ResetReviewDisplayNameFormData,
    SetReviewRatingFormData
} from "@/domains/movie-reviews/_feat/admin-actions/forms";

/**
 * Configuration for the API request to toggle a review's visibility.
 */
export type PatchToggleReviewPublicityConfig = {
    reviewID: ObjectId;
    data: ModerationMessageFormData;
};

/**
 * Configuration for the API request to update a reviewer's display name.
 */
export type PatchResetReviewDisplayNameConfig = {
    reviewID: ObjectId;
    data: ResetReviewDisplayNameFormData;
};

/**
 * Configuration for the API request to clear engagement metrics.
 */
export type PatchResetReviewLikesConfig = {
    reviewID: ObjectId;
    data: ModerationMessageFormData;
};

/**
 * Configuration for the API request to manually override a review's rating.
 */
export type PatchSetReviewRatingConfig = {
    reviewID: ObjectId;
    data: SetReviewRatingFormData;
};