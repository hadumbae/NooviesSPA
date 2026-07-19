/**
 * @fileoverview Visual badge component for displaying reservation lifecycle statuses.
 */

import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {ReservationStatus} from "@/domains/reservations/_schema/model";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/** Props for the ReservationStatusBadge component. */
type BadgeProps = {
    status: ReservationStatus;
};

/** A color-coded status indicator for Reservations. */
export function ReservationStatusBadge(
    {status}: BadgeProps
): ReactElement {
    return (
        <Badge
            variant="default"
            className={cn(
                "font-semibold tracking-wide uppercase",
                status === "CANCELLED" && "bg-gray-500 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-300",
                status === "EXPIRED" && "hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-400",
                status === "REFUNDED" && "bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500",
                status === "PAID" && "bg-green-600 hover:bg-green-700 dark:bg-green-500",
                status === "RESERVED" && "bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-300",
            )}
        >
            {status}
        </Badge>
    );
}