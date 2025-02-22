import {FC} from 'react';
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import {Dot} from "lucide-react";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {cn} from "@/common/lib/utils.ts";
import ShowingSeatMapCardOptions from "@/pages/seatmap/components/ShowingSeatMapCardOptions.tsx";

interface Props {
    seatMap: SeatMap;
    onUpdate: (seatMap: SeatMap) => void;
    onDelete: (seatMap: SeatMap) => void;
}

const ShowingSeatMapCard: FC<Props> = ({seatMap, onUpdate, onDelete}) => {
    const {isAvailable, isReserved, price, seat} = seatMap;
    const {row, seatNumber, seatType} = seat as Seat;

    return (
        <Card>
            <CardContent className="p-4 space-y-5">
                <div className="flex justify-between items-center">
                    <span className="font-bold">{seatNumber}</span>

                    <ShowingSeatMapCardOptions
                        variant="outline"
                        seatMap={seatMap}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <DetailsCardSpan label="Row" text={row} />
                    <DetailsCardSpan label="Seat Type" text={seatType} />
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-[12px] text-neutral-500 uppercase">Price</span>
                    <span className="font-bold text-3xl">${price}</span>
                </div>

                <div className="flex justify-between">
                    <div className="text-[12px] flex justify-between items-center">
                        <span>Available</span>
                        <Dot className={cn(isAvailable ? "text-green-500" : "text-red-500")} />
                    </div>
                    <div className="text-[12px] flex justify-between items-center">
                        <span>Reserved</span>
                        <Dot className={isReserved ? "text-green-500" : "text-red-500"} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingSeatMapCard;
