/**
 * @file SeatFormSubmitSeatCard.tsx
 *
 * ⚡ SeatFormSubmitSeatCard
 *
 * Renders a single seat card for a seat of layout type "SEAT".
 * Displays row, seat number, coordinates, availability, type, label, and price multiplier.
 * Provides a remove button to delete the seat from a parent-managed list.
 *
 * ⚡ Responsibilities
 * - Render seat metadata visually in a structured card
 * - Display availability status with a color-coded icon
 * - Provide a remove button that calls the passed `removeSeat` callback
 * - Validate that the seat has layout type "SEAT"
 *
 * ⚡ Example
 * ```tsx
 * <SeatFormSubmitSeatCard
 *   seat={seat}
 *   removeSeat={(id) => setSeats(prev => prev.filter(s => s._id !== id))}
 * />
 * ```
 */

import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import { HeaderTextCSS, IconTextCSS, SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import { cn } from "@/common/lib/utils.ts";
import { Armchair, BadgeCheck, DollarSign, Tag, X } from "lucide-react";
import { Button } from "@/common/components/ui/button.tsx";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link SeatFormSubmitSeatCard}.
 */
type CardProps = {
    /** The seat entity to render. Must have `layoutType` === "SEAT". */
    seat: Extract<SeatDetails, { layoutType: "SEAT" }>;

    /** Callback to remove the seat from the parent list. Receives the seat `_id`. */
    removeSeat: (_id: ObjectId) => void;
};

/**
 * ⚡ SeatFormSubmitSeatCard Component
 *
 * Renders a single card for a seat of type "SEAT".
 *
 * @component
 * @param seat - Seat details to display.
 * @param removeSeat - Callback function to remove this seat.
 * @returns JSX.Element
 */
const SeatFormSubmitSeatCard = ({ seat, removeSeat }: CardProps) => {
    const {
        _id,
        row,
        seatNumber,
        isAvailable,
        seatType,
        seatLabel,
        priceMultiplier,
        x,
        y,
    } = seat;

    return (
        <Card>
            <CardContent className="px-5 py-2 space-y-2">
                {/* ⚡ Header ⚡ */}
                <section className="flex justify-between items-center">
                    <h2 className={HeaderTextCSS}>
                        {row} • {seatNumber}
                    </h2>

                    <div className="flex items-center space-x-2">
                        <span className={cn(SecondaryTextBaseCSS, "select-none text-sm")}>
                            X{x}, Y{y}
                        </span>

                        <BadgeCheck
                            className={isAvailable ? "text-green-500" : "text-red-500"}
                            size={20}
                        />

                        <Button
                            aria-label="Remove Seat"
                            variant="outline"
                            size="icon"
                            className="px-1 py-0 rounded-3xl"
                            onClick={() => removeSeat(_id)}
                        >
                            <X />
                        </Button>
                    </div>
                </section>

                <section className={cn(SecondaryTextBaseCSS, "flex justify-between items-center")}>
                    <span className={cn(IconTextCSS, "gap-1")}>
                        <Armchair /> {seatType}
                    </span>

                    {seatLabel && (
                        <span className={cn(IconTextCSS, "gap-1")}>
                            <Tag /> {seatLabel}
                        </span>
                    )}

                    <span className={cn(IconTextCSS, "gap-1")}>
                        <DollarSign /> x{priceMultiplier}
                    </span>
                </section>
            </CardContent>
        </Card>
    );
};

export default SeatFormSubmitSeatCard;
