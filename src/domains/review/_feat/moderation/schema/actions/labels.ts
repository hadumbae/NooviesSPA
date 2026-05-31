/**
 * @fileoverview Maps movie review moderation action codes to human-readable display labels.
 */

import {MovieReviewModerationAction} from "@/domains/review/_feat/moderation/schema/actions/schema.ts";

/** Dictionary of labels for administrative moderation actions used in audit logs and tables. */
export const MovieReviewModerationActionLabels: Record<MovieReviewModerationAction, string> = {
    "MOD_SOFT_DELETE": "Soft Delete",
    "MOD_TOGGLE_PUBLICITY": "Toggle Publicity",
    "MOD_RESET_DISPLAY_NAME": "Reset Display Name",
    "MOD_RESET_LIKES": "Reset Likes",
    "MOD_SET_RATING": "Set Rating",
};