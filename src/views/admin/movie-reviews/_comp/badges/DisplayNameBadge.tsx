/**
 * @fileoverview Compact badge component for highlighting a user's display name.
 *
 */

import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/**
 * Props for the DisplayNameBadge component.
 */
type BadgeProps = {
    displayName: string;
    className?: string;
};

/**
 * Renders a stylized badge identifying the author of a review or comment.
 */
export function DisplayNameBadge(
    {displayName, className}: BadgeProps
): ReactElement {
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
}