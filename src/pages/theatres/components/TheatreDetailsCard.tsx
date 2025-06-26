import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    theatre: TheatreDetails;
}

const TheatreDetailsCard: FC<Props> = ({theatre}) => {
    const {
        name,
        location,
        seatCapacity,
        screenCount,
        seatCount,
        futureShowingCount,
    } = theatre;


    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                <DetailsCardSpan label="Name" text={name} />

                <DetailsCardSpan label="Location" text={location} />

                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Seat Capacity" text={`${seatCapacity} seats`} />
                    <DetailsCardSpan label="Registered Screens" text={`${screenCount} screens`} />
                    <DetailsCardSpan label="Registered Seats" text={`${seatCount} seats`} />
                    <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`} />
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreDetailsCard;
