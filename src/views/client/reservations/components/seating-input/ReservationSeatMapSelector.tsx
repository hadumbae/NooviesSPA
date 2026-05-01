/**
 * @fileoverview Seat map selection grid used during client-side reservations.
 */

import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {cn} from "@/common/lib/utils.ts";
import ReservationSeatMapElement from "@/views/client/reservations/components/seating-input/ReservationSeatMapElement.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useOrganisedSeatingForLayout} from "@/domains/seats/_feat/handle-seat-layout";
import {ReactElement} from "react";

/** Props for the ReservationSeatMapSelector component. */
type SelectorProps = {
    className?: string;
    seating: SeatMapDetails[];
    value: ObjectId[];
    updateValue: (selection: ObjectId[]) => void;
};

/** Renders a selectable seat map grid. */
export function ReservationSeatMapSelector(
    {seating, className, value: selectedSeating, updateValue: updateSelection}: SelectorProps
): ReactElement {
    const {seatRowEntries} = useOrganisedSeatingForLayout({
        seating,
        includeLabels: false,
    });

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
}

