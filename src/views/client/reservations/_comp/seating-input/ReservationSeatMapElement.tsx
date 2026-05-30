/**
 * @fileoverview Single seat cell used within the reservation seat map.
 */

import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {Check, Plus} from "lucide-react";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";

/** Props for the ReservationSeatMapElement component. */
type ElementProps = {
    isSelected: boolean;
    element: SeatMapDetails | null;
    toggleSeat: (_id: ObjectId) => void;
};

const SIZE_CSS = "h-8 w-8";
const CONTAINER_CSS = cn(RoundedBorderCSS, SIZE_CSS);

/**
 * Renders a selectable seat button or an inert placeholder for unavailable cells.
 */
export function ReservationSeatMapElement(
    {isSelected, element, toggleSeat}: ElementProps
): ReactElement {
    if (!element || element.status !== "AVAILABLE") {
        return (
            <div
                className={cn(CONTAINER_CSS, "bg-gray-200 dark:bg-gray-700")}
            />
        );
    }

    const {_id, seatLabel, row, x} = element;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="default"
                    onClick={() => toggleSeat(_id)}
                    className={cn(
                        SIZE_CSS, isSelected
                        ? "reservation-selected-seat"
                        : "reservation-unselected-seat",
                    )}
                >
                    {isSelected ? <Check/> : <Plus/>}
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                <p>{seatLabel ?? `${row}${x}`}</p>
            </TooltipContent>
        </Tooltip>
    );
}
