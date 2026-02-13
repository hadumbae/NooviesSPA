/**
 * @file ReservationSeatMapSelector.tsx
 *
 * Seat map selection grid used during client-side reservations.
 *
 * Responsibilities:
 * - Organize raw seat map data into layout-ready rows
 * - Render seat elements in their visual positions
 * - Manage seat selection toggling
 *
 * @remarks
 * This component is stateless.
 * Selection state is fully controlled by the parent.
 */

import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {cn} from "@/common/lib/utils.ts";
import useOrganisedSeatingForLayout
    from "@/pages/seats/hooks/features/admin/screen-seat-layout/useOrganisedSeatingForLayout.ts";
import ReservationSeatMapElement from "@/features/client/reservations/components/seating-input/ReservationSeatMapElement.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link ReservationSeatMapSelector}.
 */
type SelectorProps = {
    /** Optional wrapper class overrides */
    className?: string;

    /** Flat seat map details used to construct the layout */
    seating: SeatMapDetails[];

    /** Currently selected seat IDs */
    value: ObjectId[];

    /** Updates the selected seat IDs */
    updateValue: (selection: ObjectId[]) => void;
};

/**
 * Renders a selectable seat map grid.
 *
 * @param seating - Seat map data
 * @param className - Optional wrapper styles
 * @param value - Selected seat IDs
 * @param updateValue - Selection update callback
 */
const ReservationSeatMapSelector = (
    {seating, className, value: selectedSeating, updateValue: updateSelection}: SelectorProps
) => {
    const {seatRowEntries} = useOrganisedSeatingForLayout({
        seating,
        includeLabels: false,
    });

    /**
     * Toggles a seat ID in the current selection.
     */
    const toggleSeat = (_id: ObjectId) => {
        selectedSeating.includes(_id)
            ? updateSelection(selectedSeating.filter(v => v !== _id))
            : updateSelection([...selectedSeating, _id]);
    };

    return (
        <div className={cn("space-y-2", className)}>
            {seatRowEntries.map(([y, rowSeats]) => (
                <div key={`row-${y}`} className="flex justify-center items-center gap-3">
                    {(rowSeats as (SeatMapDetails | null)[]).map((element, index) => {
                        const key = element ? `${element._id}-${index}` : `null-${index}`;
                        const isSelected = element
                            ? selectedSeating.includes(element._id)
                            : false;

                        return (
                            <ReservationSeatMapElement
                                element={element}
                                key={key}
                                isSelected={isSelected}
                                toggleSeat={toggleSeat}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ReservationSeatMapSelector;
