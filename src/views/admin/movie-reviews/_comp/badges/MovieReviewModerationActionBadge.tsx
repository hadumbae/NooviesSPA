/**
 * @fileoverview Badge component for displaying movie review moderation actions with semantic color-coding.
 */

import {ReactElement} from "react";
import {Badge} from "@/common/components/ui/badge.tsx";
import {MovieReviewModerationAction} from "@/domains/movie-reviews/_feat/moderation/schema";
import {MovieReviewModerationActionLabels} from "@/domains/movie-reviews/_feat/moderation/schema/actions/labels.ts";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieReviewModerationActionBadge component. */
type BadgeProps = {
    action: MovieReviewModerationAction;
    className?: string;
};

const COLOUR_CSS: Record<MovieReviewModerationAction, string> = {
    MOD_SOFT_DELETE: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200",
    MOD_TOGGLE_PUBLICITY: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    MOD_RESET_DISPLAY_NAME: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
    MOD_RESET_LIKES: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
    MOD_SET_RATING: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
};

/**
 * Renders a badge indicating the type of moderation action performed.
 */
export function MovieReviewModerationActionBadge(
    {action, className}: BadgeProps
): ReactElement {
    return (
        <Badge variant="outline" className={cn(
            "text-xs font-medium",
            COLOUR_CSS[action],
            className
        )}>
            {MovieReviewModerationActionLabels[action]}
        </Badge>
    );
}