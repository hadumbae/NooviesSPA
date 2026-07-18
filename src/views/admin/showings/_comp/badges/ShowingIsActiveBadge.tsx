/**
 * @fileoverview Badge component for displaying the active status of a movie showing.
 */

import {ReactElement} from "react";
import {Badge} from "@/common/components/ui/badge.tsx";
import {cn} from "@/common/_feat";

/** Props for the ShowingIsActiveBadge component. */
type BadgeProps = {
    isActive: boolean;
    className?: string;
};

/**
 * Renders a color-coded badge indicating whether a showing is active or inactive.
 */
export function ShowingIsActiveBadge(
    {isActive, className}: BadgeProps
): ReactElement {
    return (
        <Badge className={cn(
            isActive ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400",
            className
        )}>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}