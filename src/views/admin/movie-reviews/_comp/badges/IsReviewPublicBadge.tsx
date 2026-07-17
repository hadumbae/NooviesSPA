/**
 * @fileoverview Status badge component indicating the visibility state of a movie review.
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ReactElement} from "react";

/** Props for the IsReviewPublicBadge component. */
type BadgeProps = {
    isPublic: boolean;
    className?: string;
};

/** Renders a color-coded badge reflecting a review's moderation visibility status. */
export function IsReviewPublicBadge(
    {isPublic, className}: BadgeProps
): ReactElement {
    const badgeText = isPublic ? "Public" : "Hidden";

    return (
        <Badge variant="outline" className={cn(
            "select-none font-semibold text-white dark:text-white",
            isPublic
                ? "bg-green-500 dark:bg-green-600 "
                : "bg-neutral-400 dark:bg-neutral-600",
            className
        )}>
            {badgeText}
        </Badge>
    );
}