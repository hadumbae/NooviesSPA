import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";
import SeatOptions from "@/pages/seats/components/SeatOptions.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

interface Props {
    seat: Seat;
    onDelete?: () => void;
}

const SeatListCard: FC<Props>  = ({seat, onDelete}) => {
    const {_id, row, seatNumber, seatType, isAvailable, priceMultiplier, theatre, screen} = seat;

    const theatreName = (theatre as Theatre).name;
    const screenName = (screen as Screen).name;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                <div className="flex justify-between items-center">
                    <Link to={`/admin/seats/get/${_id}`} className="text-lg font-bold hover:underline">
                        {row} | {seatNumber}
                    </Link>

                    <SeatOptions seat={seat} onDelete={onDelete} variant="outline" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Seat Type</span>
                        <span className="font-bold">{seatType}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Is Available?</span>
                        <span className="font-bold">{isAvailable ? "True" : "False"}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Price Multiplier</span>
                        <span className="font-bold">x{priceMultiplier}</span>
                    </div>

                </div>

                <div className="flex justify-center items-center space-x-16">
                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Theater</span>
                        <span className="font-bold">{theatreName}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Screen</span>
                        <span className="font-bold">{screenName}</span>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};

export default SeatListCard;
