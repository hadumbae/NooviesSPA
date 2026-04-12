/**
 * @fileoverview Provides a decorative accent bar used in log lists to
 * visually group or categorize moderation entries by their action type.
 */

import {ReactElement} from "react";
import {MovieReviewModerationAction} from "@/domains/review/features/moderation/schema";
import {cn} from "@/common/lib/utils.ts";

type BarProps = {
    action: MovieReviewModerationAction;
    className?: string;
};

const COLOUR_CSS: Record<MovieReviewModerationAction, string> = {
    MOD_SOFT_DELETE: "bg-red-100 dark:bg-red-950",
    MOD_TOGGLE_PUBLICITY: "bg-amber-100 dark:bg-amber-950",
    MOD_RESET_DISPLAY_NAME: "bg-teal-100 dark:bg-teal-950",
    MOD_RESET_LIKES: "bg-violet-100 dark:bg-violet-950",
    MOD_SET_RATING: "bg-blue-100 dark:bg-blue-950",
};

/**
 * Renders a thin, color-coded horizontal bar used as a visual indicator
 * in moderation log entry layouts.
 */
export function MovieReviewModerationLogAccentBar(
    {action, className}: BarProps
): ReactElement {
    return (
        <div className={cn(
            COLOUR_CSS[action],
            "h-1",
            className
        )}/>
    );
}