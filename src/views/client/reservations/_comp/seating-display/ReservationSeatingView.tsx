/**
 * @fileoverview Renders reservation seating arranged into display rows.
 */

import {ObjectId} from "@/common/_schemas";
import {cn} from "@/common/lib/utils.ts";
import {
    ReservationSeatingElement
} from "@/views/client/reservations/_comp/seating-display/ReservationSeatingElement.tsx";
import {useOrganisedSeatingForLayout} from "@/domains/seats/_feat/handle-seat-layout";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";

/** Props for the ReservationSeatingView component. */
type DisplayProps = {
    selectedSeating: ObjectId[];
    seating: SeatMapDetails[];
    className?: string;
}

/** Displays seating elements grouped by layout row. */
export function ReservationSeatingView(
    {selectedSeating, seating, className}: DisplayProps
): ReactElement {
    const {seatRowEntries} = useOrganisedSeatingForLayout({
        seating,
        includeLabels: false,
    });

    const isSelected = (_id?: ObjectId | null) => _id
        ? selectedSeating.includes(_id)
        : false;

    return (
        <div className={cn("space-y-2", className)}>
            {seatRowEntries.map(([y, rowSeats]) => (
                <div key={`row-${y}`} className="flex justify-center items-center gap-3">
                    {(rowSeats as (SeatMapDetails | null)[]).map((element, index) => {
                        const key = element ? `${element._id}-${index}` : `null-${index}`;
                        const isElementSelected = isSelected(element && element._id);

                        return (
                            <ReservationSeatingElement
                                key={key}
                                element={element}
                                isSelected={isElementSelected}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
