/**
 * @file ReservationSeatingElement.tsx
 * Selection-aware wrapper for rendering seat map elements with optional tooltip.
 */

import {BaseSeatingElement} from "@/views/client/reservations/_comp/seating/BaseSeatingElement.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";

/**
 * Props for the ReservationSeatingElement component.
 */
type ElementProps = {
    element: SeatMapDetails | null;
    isSelected?: boolean;
}

/**
 * Renders a seating element with details exposed when selected.
 */
export function ReservationSeatingElement(
    {isSelected, element}: ElementProps
): ReactElement {
    if (element === null) {
        return (
            <BaseSeatingElement type="STRUCTURE"/>
        );
    }

    const {seatLabel, row, x} = element;

    if (!isSelected) {
        return (
            <BaseSeatingElement type="SEAT"/>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <BaseSeatingElement type="SELECTED"/>
            </TooltipTrigger>

            <TooltipContent>
                <p>{seatLabel ?? `${row}${x}`}</p>
            </TooltipContent>
        </Tooltip>
    );
}
