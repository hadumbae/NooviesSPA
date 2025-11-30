/**
 * @file SeatFormSubmitList.tsx
 *
 * @summary
 * Renders a list of seat entries created via a Seat Submit Form. Each seat is
 * displayed inside a styled card with row/number, coordinates, availability,
 * type, label, and price multiplier.
 *
 * @description
 * This component is intended as a "preview" or "pending list" of seats before
 * final submission. It provides:
 * - Seat metadata visualization
 * - Coordinate display (`x`, `y`)
 * - Availability status via colored icons
 * - Removal of seats from the list via a button
 *
 * The component receives the `seats` array and a setter from the parent and
 * updates the state when a seat is removed.
 */

import {Dispatch, FC, SetStateAction} from 'react';
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {HeaderTextCSS, IconTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import {Armchair, BadgeCheck, DollarSign, Tag, X} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link SeatFormSubmitList}.
 *
 * @property seats - The array of seat objects to display.
 * @property setSeats - React state setter for updating the seat array.
 */
type ListProps = {
    /** Array of `Seat` objects to display in the list. */
    seats: Seat[];

    /** React state setter to update the seat array. */
    setSeats: Dispatch<SetStateAction<Seat[]>>;
};

/**
 * @component SeatFormSubmitList
 *
 * @description
 * Displays a grid of seat cards for all seats in the `seats` array. Each card
 * shows:
 * - Row and seat number
 * - Coordinates (`x`, `y`)
 * - Availability status (green/red BadgeCheck)
 * - Seat type
 * - Optional seat label
 * - Price multiplier
 *
 * Users can remove seats from the list using the remove button.
 *
 * @param props - See {@link ListProps}.
 * @returns A React element rendering a grid of seat cards.
 *
 * @example
 * ```tsx
 * const [seats, setSeats] = useState<Seat[]>([]);
 *
 * <SeatFormSubmitList seats={seats} setSeats={setSeats} />
 * ```
 */
const SeatFormSubmitList: FC<ListProps> = ({seats, setSeats}) => {
    const removeSeat = (_id: ObjectId) => {
        setSeats(prev => prev.filter(s => s._id !== _id));
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {seats.map((seat: Seat) => {
                const {_id, row, seatLabel, priceMultiplier, seatNumber, x, y, seatType, isAvailable} = seat;

                return (
                    <Card key={_id}>
                        <CardContent className="px-5 py-2 space-y-2">
                            {/* ⚡ Header ⚡ */}
                            <section className="flex justify-between items-center">
                                <h1 className={HeaderTextCSS}>
                                    {row} • {seatNumber}
                                </h1>

                                <div className="flex items-center space-x-2">
                                    <span className={cn(SecondaryTextBaseCSS, "select-none text-sm")}>
                                        X{x}, Y{y}
                                    </span>

                                    <BadgeCheck
                                        className={isAvailable ? "text-green-500" : "text-red-500"}
                                        size={20}
                                    />

                                    <Button
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
            })}
        </div>
    );
};

export default SeatFormSubmitList;
