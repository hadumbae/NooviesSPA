/**
 * @fileoverview Defines a strictly typed mapping of movie review moderation
 * action codes to their human-readable display labels.
 */

import {MovieReviewModerationAction} from "@/domains/review/features/moderation/schema";

/**
 * A dictionary of labels corresponding to administrative moderation actions.
 * Used primarily for displaying action types in audit logs and moderation tables.
 */
export const MovieReviewModerationActionLabels: Record<MovieReviewModerationAction, string> = {
    "MOD_SOFT_DELETE": "Soft Delete",
    "MOD_TOGGLE_PUBLICITY": "Toggle Publicity",
    "MOD_RESET_DISPLAY_NAME": "Reset Display Name",
    "MOD_RESET_LIKES": "Reset Likes",
    "MOD_SET_RATING": "Set Rating",
};