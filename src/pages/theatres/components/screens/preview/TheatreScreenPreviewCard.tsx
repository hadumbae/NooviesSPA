import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Link} from "react-router-dom";
import {ArrowUpRight} from "lucide-react";

interface Props {
    screen: ScreenDetails;
}

const TheatreScreenPreviewCard: FC<Props> = ({screen}) => {
    const {_id, name, screenType, capacity, seatCount, futureShowingCount} = screen;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="underline underline-offset-4">{name}</span>

                    <Link
                        to={`/admin/screens/get/${_id}`} target="_blank"
                        className="underline underline-offset-4 text-neutral-400 hover:text-black"
                    >
                        <ArrowUpRight/>
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-4">
                <DetailsCardSpan label="Screen Type" text={screenType}/>
                <DetailsCardSpan label="Seats / Capacity" text={`${seatCount} / ${capacity} seats`}/>
                <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
            </CardContent>
        </Card>
    );
};

export default TheatreScreenPreviewCard;
