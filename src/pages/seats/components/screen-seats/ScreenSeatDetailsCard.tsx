import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import SeatRowDetailsScreen
    from "@/pages/seats/components/screen-seats/ScreenSeatDetailsPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";

type CardProps = {
    seat: Seat;
    className?: string;
}

// [X] seatNumber
// [X] seatLabel
// [X] seatType
// [] isAvailable
// [] x
// [] y
// [] priceMultiplier

const ScreenSeatDetailsCard: FC<CardProps> = ({seat, className}) => {
    const {row, seatNumber, seatLabel, seatType, isAvailable} = seat;

    const seatTitle = seatLabel ? seatLabel : `${row}${seatNumber}`
    const availability = isAvailable ? "Available" : "Not Available";

    return (
        <Card className={className}>
            <CardContent className="p-2 space-y-4">
                <section className="flex flex-col items-center">
                    <span className="font-bold text-lg">{seatTitle}</span>
                    <span className="text-sm italic">{seatType} | {availability}</span>
                </section>

                <SeatRowDetailsScreen seat={seat}>
                    <Button
                        variant="outline" size="sm"
                        className="text-neutral-400 hover:text-black w-full"
                    >
                        Details
                    </Button>
                </SeatRowDetailsScreen>
            </CardContent>
        </Card>
    );
};

export default ScreenSeatDetailsCard;
