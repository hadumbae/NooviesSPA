/**
 * @fileoverview Badge component to distinguish between special and standard movie events.
 */

import {ReactElement} from "react";
import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {cn} from "@/common/_feat";

/** Props for the ShowingSpecialEventBadge component. */
type BadgeProps = {
    isSpecialEvent?: boolean;
    className?: string;
};

/**
 * Displays a color-coded badge indicating if a showing is a special event or a standard event.
 */
export function ShowingSpecialEventBadge(
    {isSpecialEvent = false, className}: BadgeProps
): ReactElement {
    return (
        <Badge className={cn(
            isSpecialEvent ? "bg-yellow-500 dark:bg-yellow-400" : "bg-blue-500 dark:bg-blue-400",
            className
        )}>
            {isSpecialEvent ? "Special Event" : "Standard Event"}
        </Badge>
    );
}