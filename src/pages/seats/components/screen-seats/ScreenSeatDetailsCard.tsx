import { FC } from 'react';
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import ScreenSeatDetailsPanel from "@/pages/seats/components/screen-seats/ScreenSeatDetailsPanel.tsx";
import { Button } from "@/common/components/ui/button.tsx";

/**
 * Props for the {@link ScreenSeatDetailsCard} component.
 */
type CardProps = {
    /** The seat object to display details for. */
    seat: Seat;

    /** Optional additional CSS classes for the card. */
    className?: string;
};

/**
 * Displays a card with information about a single seat.
 *
 * Shows the seat's row, number, label, type, and availability.
 * Also includes a button to open a detailed view of the seat via `SeatRowDetailsScreen`.
 *
 * @component
 * @param props - Component props.
 * @param props.seat - The seat object to display.
 * @param props.className - Optional additional CSS classes for styling the card.
 *
 * @returns A JSX element representing a seat card.
 */
const ScreenSeatDetailsCard: FC<CardProps> = ({ seat, className }) => {
    const { row, seatNumber, seatLabel, seatType, isAvailable } = seat;

    /** Title to display for the seat (uses label if available, otherwise row+number). */
    const seatTitle = seatLabel ? seatLabel : `${row}${seatNumber}`;

    /** Availability status of the seat. */
    const availability = isAvailable ? "Available" : "Not Available";

    return (
        <Card className={className}>
            <CardContent className="p-2 space-y-4">
                <section className="flex flex-col items-center">
                    <span className="font-bold text-lg">{seatTitle}</span>
                    <span className="text-sm italic">{seatType} | {availability}</span>
                </section>

                <ScreenSeatDetailsPanel seat={seat}>
                    <Button
                        size="sm"
                        variant="outline"
                        className="text-neutral-400 hover:text-black w-full"
                    >
                        Details
                    </Button>
                </ScreenSeatDetailsPanel>
            </CardContent>
        </Card>
    );
};

export default ScreenSeatDetailsCard;
