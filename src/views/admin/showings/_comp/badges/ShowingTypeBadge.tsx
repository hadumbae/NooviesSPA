/**
 * @fileoverview Badge component that displays the reservation type of a showing.
 */

import {ReactElement} from "react";
import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {cn} from "@/common/_feat";

/** Props for the ShowingTypeBadge component. */
type BadgeProps = {
    canReserveSeats?: boolean;
    className?: string;
};

/**
 * Renders a colored badge indicating whether a showing supports seat reservations.
 */
export function ShowingTypeBadge(
    {canReserveSeats, className}: BadgeProps
): ReactElement {
    const showingType = canReserveSeats ? "Reserved" : "General";

    return (
        <Badge className={cn(
            canReserveSeats ? "bg-sky-600" : "bg-cyan-600",
            className,
        )}>
            {showingType}
        </Badge>
    );
}