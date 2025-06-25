import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import ScreenOptions from "@/pages/screens/components/dialog/ScreenOptions.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    screen: Screen;
    onDelete?: () => void;
}

const ScreenListCard: FC<Props>  = ({screen, onDelete}) => {
    const {_id, name, capacity, screenType, theatre, seats} = screen;
    const theatreName = (theatre as TheatreDetails).name;

    return (
        <Card>
            <CardContent className="flex flex-col space-y-5 p-4">
                <div className="flex justify-between items-center">
                    <Link to={`/admin/screens/get/${_id}`} className="text-lg font-bold hover:underline">
                        {name}
                    </Link>

                    <ScreenOptions screen={screen} onDelete={onDelete} variant="outline" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Capacity</span>
                        <span className="font-bold">{capacity} seats</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Type</span>
                        <span className="font-bold">{screenType}</span>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Num. of Seats</span>
                        <span className="font-bold">{seats.length} seats</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                        <span className="text-[12px] text-neutral-500">Theatre</span>
                        <span className="font-bold">{theatreName}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScreenListCard;
