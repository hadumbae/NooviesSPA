/**
 * @file MyReservationSeatingCard.tsx
 * Displays selected reservation seating within a card layout.
 */

import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import ReservationSeatingLoader
    from "@/features/client/reservations/components/seating-display/ReservationSeatingLoader.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SeatMapWithSeat} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

/**
 * Props for the MyReservationSeatingCard component.
 */
type CardProps = {
    showingID: ObjectId;
    selectedSeating: SeatMapWithSeat[];
    className?: string;
}

/**
 * Renders selected seating layout and labels for a reservation.
 */
const MyReservationSeatingCard = (
    {className, showingID, selectedSeating}: CardProps
) => {
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
};

export default MyReservationSeatingCard;
