import {FC} from 'react';
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import TheatreOptions from "@/pages/theatres/components/TheatreOptions.tsx";

interface Props {
    theatre: Theatre;
    onDelete: () => void;
}

const TheatreListCard: FC<Props>  = ({theatre, onDelete}) => {
    const {_id, name, location, seatCapacity, seats, screens} = theatre;

    return (
        <Card>
            <CardContent className="flex flex-col space-y-2 p-4">
                <div className="flex justify-between">
                    <Link to={`/admin/theatres/get/${_id}`} className="text-lg font-bold hover:underline">
                        {name}
                    </Link>
                    <TheatreOptions theatre={theatre} onDelete={onDelete} variant="outline" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Capacity</span>
                        <span className="font-bold">{seatCapacity}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Seats</span>
                        <span className="font-bold">{seats.length}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[12px] text-neutral-500">Screens</span>
                        <span className="font-bold">{screens.length}</span>
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
