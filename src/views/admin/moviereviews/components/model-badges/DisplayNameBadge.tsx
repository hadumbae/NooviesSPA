/**
 * @file Compact badge component for highlighting a user's display name.
 * @filename DisplayNameBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the DisplayNameBadge component.
 */
type BadgeProps = {
    /** The author's display name to be rendered within the badge. */
    displayName: string;
    /** Optional CSS classes for additional styling or layout adjustments. */
    className?: string;
};

/**
 * Renders a stylized badge identifying the author of a review or comment.
 * ---
 */
export const DisplayNameBadge = (
    {displayName, className}: BadgeProps
) => {
    return (
        <Badge
            variant="outline"
            className={cn(
                "select-none text-sm font-bold tracking-tight",
                "bg-black text-white dark:bg-white dark:text-black",
                className
            )}
        >
            {displayName}
        </Badge>
    );
};