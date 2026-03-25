/**
 * @file Visual badge component for displaying reservation lifecycle statuses.
 * @filename ReservationStatusBadge.tsx
 */

import {Badge} from "@/common/components/ui/badge.tsx";
import {ReservationStatus} from "@/domains/reservation/schema/model";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link ReservationStatusBadge} component.
 */
type BadgeProps = {
    /** The current transactional or lifecycle state of the reservation. */
    status: ReservationStatus;
};

/**
 * A color-coded status indicator for Reservations.
 * @param props - Component properties containing the status string.
 */
export const ReservationStatusBadge = (
    {status}: BadgeProps
) => {
    return (
        <Badge
            variant="default"
            className={cn(
                "font-semibold tracking-wide uppercase",
                (status === "CANCELLED" || status === "REFUNDED") && "bg-red-500 hover:bg-red-600 dark:bg-red-500",
                status === "EXPIRED" && "bg-red-800 hover:bg-red-900 dark:bg-red-700",
                status === "PAID" && "bg-green-600 hover:bg-green-700 dark:bg-green-500",
                status === "RESERVED" && "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 text-white dark:text-black",
            )}
        >
            {status}
        </Badge>
    );
};