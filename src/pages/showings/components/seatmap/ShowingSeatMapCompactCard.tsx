import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";

import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

interface Props {
    seatMap: SeatMap;
}

const ShowingSeatMapCompactCard: FC<Props> = ({seatMap}) => {
    const {isAvailable, isReserved, price, seat} = seatMap;
    const {row, seatNumber, seatType} = seat as Seat;

    const availability = isAvailable
        ? isReserved ? "Reserved" : "Available"
        : "Not Available"

    return (
        <Card>
            <CardContent className="p-2 flex flex-col items-center space-y-3">
                <div className="flex flex-col items-center space-y-0">
                    <span className="font-extrabold">{row} | {seatNumber}</span>
                    <span className="text-sm text-neutral-500">{seatType}</span>
                </div>

                <span>${price}</span>

                <span className="italic">{availability}</span>
            </CardContent>
        </Card>
    );
};

export default ShowingSeatMapCompactCard;
