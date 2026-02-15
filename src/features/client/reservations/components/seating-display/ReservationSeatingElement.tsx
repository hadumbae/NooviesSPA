/**
 * @file ReservationSeatingElement.tsx
 * Selection-aware wrapper for rendering seat map elements with optional tooltip.
 */

import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import BaseSeatingElement from "@/features/client/reservations/components/seating/BaseSeatingElement.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";

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
const ReservationSeatingElement = (
    {isSelected, element}: ElementProps
) => {
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
};

export default ReservationSeatingElement;
