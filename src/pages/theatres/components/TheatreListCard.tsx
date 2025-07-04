import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import TheatreOptions from "@/pages/theatres/components/TheatreOptions.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    theatre: TheatreDetails;
    onDelete?: () => void;
}

const TheatreListCard: FC<Props>  = ({theatre, onDelete}) => {
    const {
        _id,
        name,
        location,
        seatCapacity,
        seatCount,
        screenCount,
        futureShowingCount,
    } = theatre;

    return (
        <Card>
            <CardContent className="flex flex-col space-y-2 p-4">
                <div className="flex justify-between">
                    <Link to={`/admin/theatres/get/${_id}`} className="text-lg font-bold hover:underline">
                        {name}
                    </Link>
                    <TheatreOptions theatre={theatre} variant="outline" onDelete={onDelete} />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Capacity</span>
                        <span className="font-bold">{seatCapacity} seats</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Registered Seats</span>
                        <span className="font-bold">{seatCount} seats</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Screens</span>
                        <span className="font-bold">{screenCount} screens</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Showings</span>
                        <span className="font-bold">{futureShowingCount} showings</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <span className="text-[12px] text-neutral-500">Location</span>
                    <span className="font-bold">{location}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreListCard;
