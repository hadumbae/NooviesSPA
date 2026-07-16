/**
 * @fileoverview Card component for seat-type layout elements, displaying comprehensive
 * metadata including availability, type, custom labels, and pricing modifiers.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Armchair, BadgeCheck, DollarSign, Tag, X} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/_schemas";
import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {SeatDetails} from "@/domains/seats";

/** Props for the SeatFormSubmitSeatCard component. */
type CardProps = {
    seat: Extract<SeatDetails, { layoutType: "SEAT" }>;
    removeSeat: (_id: ObjectId) => void;
};

/**
 * Renders a detailed card for physical seats, featuring status indicators and pricing multipliers.
 */
export function SeatFormSubmitSeatCard(
    {seat, removeSeat}: CardProps
): ReactElement {
    const {_id, row, seatNumber, isAvailable, seatType, seatLabel, priceMultiplier, x, y} = seat;

    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-3">
                <section className="flex justify-between items-center">
                    <PageSectionHeader as="h2" text={`Row ${row} • Seat ${seatNumber}`}/>

                    <div className="flex items-center space-x-2">
                        <span className="secondary-text select-none text-xs font-mono">
                            ({x}, {y})
                        </span>

                        <BadgeCheck
                            className={isAvailable ? "text-green-500" : "text-destructive"}
                            size={18}
                        />

                        <Button
                            aria-label="Remove Seat"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeSeat(_id)}
                        >
                            <X className="h-4 w-4"/>
                        </Button>
                    </div>
                </section>

                <section className="secondary-text flex justify-between items-center text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-with-icon gap-1">
                            <Armchair size={14}/> {seatType}
                        </span>

                        {seatLabel && (
                            <span className="text-with-icon gap-1">
                                <Tag size={14}/> {seatLabel}
                            </span>
                        )}
                    </div>

                    <span className="text-with-icon gap-1 font-medium text-primary">
                        <DollarSign size={14}/> {priceMultiplier.toFixed(2)}
                    </span>
                </section>
            </CardContent>
        </Card>
    );
}