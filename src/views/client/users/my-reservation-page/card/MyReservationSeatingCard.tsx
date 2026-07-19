/**
 * @fileoverview Displays selected reservation seating within a card layout.
 */

import {Card, CardContent, CardHeader, CardTitle} from "@/views/common/_comp/ui/card.tsx";
import {ReservationSeatingLoader} from "@/views/client/reservations/_comp/seating-display/ReservationSeatingLoader.tsx";
import {ObjectId} from "@/common/_schemas";
import {ReactElement} from "react";

import {SeatMapWithSeat} from "@/domains/seatmaps/_schema/model/SeatMapWithSeatSchema";

/** Props for the MyReservationSeatingCard component. */
type CardProps = {
    showingID: ObjectId;
    selectedSeating: SeatMapWithSeat[];
    className?: string;
}

/** Renders selected seating layout and labels for a reservation. */
export function MyReservationSeatingCard(
    {className, showingID, selectedSeating}: CardProps
): ReactElement {
    const seatIDs: ObjectId[] = [];
    const seatLabels: string[] = [];

    for (const {_id, seat: {row, seatNumber, seatLabel}} of selectedSeating) {
        seatIDs.push(_id);
        seatLabels.push(seatLabel ?? `${row}${seatNumber}`);
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>My Seats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <ReservationSeatingLoader
                    showingID={showingID}
                    selectedSeating={seatIDs}
                />

                <p className="break-words">
                    <span className="font-bold italic">Selected Seats</span> {seatLabels.join(" • ")}
                </p>
            </CardContent>
        </Card>
    );
}
