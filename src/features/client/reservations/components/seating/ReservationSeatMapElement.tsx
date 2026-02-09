/**
 * @file ReservationSeatMapElement.tsx
 *
 * Single seat cell used within the reservation seat map.
 *
 * Responsibilities:
 * - Render seat availability state
 * - Indicate selection status
 * - Emit toggle events for selectable seats
 *
 * @remarks
 * - Non-available or empty layout cells render as inert placeholders
 * - Selection state is controlled by the parent
 */

import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {Check, Plus} from "lucide-react";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    SelectedSeatButtonCSS,
    UnselectedSeatButtonCSS,
} from "@/pages/reservation/constants/ReservationButtonCSS.ts";

/**
 * Props for {@link ReservationSeatMapElement}.
 */
type ElementProps = {
    /** Whether the seat is currently selected */
    isSelected: boolean;

    /** Seat data or `null` for layout gaps */
    element: SeatMapDetails | null;

    /** Toggles the seat selection by ID */
    toggleSeat: (_id: ObjectId) => void;
};

const SIZE_CSS = "h-8 w-8";
const CONTAINER_CSS = cn(RoundedBorderCSS, SIZE_CSS);

/**
 * Renders a selectable seat button or an inert placeholder.
 *
 * @param isSelected - Current selection state
 * @param element - Seat metadata or `null`
 * @param toggleSeat - Selection toggle handler
 */
const ReservationSeatMapElement = (
    {isSelected, element, toggleSeat}: ElementProps
) => {
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
                        SIZE_CSS,
                        isSelected
                            ? SelectedSeatButtonCSS
                            : UnselectedSeatButtonCSS,
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
};

export default ReservationSeatMapElement;
