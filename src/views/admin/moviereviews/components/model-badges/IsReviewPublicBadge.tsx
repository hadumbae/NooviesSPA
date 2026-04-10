/**
 * @file Status badge component indicating the visibility state of a movie review.
 * @filename IsReviewPublicBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the IsReviewPublicBadge component.
 */
type BadgeProps = {
    /** Whether the review is currently visible to the public. */
    isPublic: boolean;
    /** Optional CSS classes for additional styling or layout adjustments. */
    className?: string;
};

/**
 * Renders a color-coded badge reflecting a review's moderation visibility status.
 * ---
 */
export const IsReviewPublicBadge = (
    {isPublic, className}: BadgeProps
) => {
    const badgeText = isPublic ? "Public" : "Hidden";

    return (
        <Badge
            variant="outline"
            className={cn(
                "select-none font-semibold text-white dark:text-white",
                isPublic
                    ? "bg-green-500 dark:bg-green-600 "
                    : "bg-neutral-400 dark:bg-neutral-600",
                className
            )}
        >
            {badgeText}
        </Badge>
    );
};