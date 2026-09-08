/**
 * @fileoverview Badge component for rendering formatted reservation type labels with contextual styling.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {Badge} from "@/views/common/_comp/ui";
import {ReservationType} from "@/domains/reservations/_schema/model";
import {ReservationTypeLabelMap} from "@/domains/reservations/_const/label-maps";

/** Props for the ReservationTypeBadge component. */
type BadgeProps = {
    resType: ReservationType;
    className?: string;
};

/**
 * Renders a stylized badge corresponding to a given reservation type.
 */
export function ReservationTypeBadge(
    {resType, className}: BadgeProps
): ReactElement {
    const displayType = ReservationTypeLabelMap[resType].split(" ")[0];

    return (
        <Badge variant="outline" className={cn(
            "text-white",
            resType === "GENERAL_ADMISSION" && "bg-sky-600",
            resType === "RESERVED_SEATS" && "bg-cyan-600",
            className,
        )}>
            {displayType}
        </Badge>
    );
}