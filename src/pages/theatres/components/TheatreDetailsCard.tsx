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
        screens,
        seats,
    } = theatre;

    const screenNum = screens.length;
    const seatNum = seats.length;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                <DetailsCardSpan label="Name" text={name} />

                <DetailsCardSpan label="Location" text={location} />

                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Seat Capacity" text={`${seatCapacity} seats`} />
                    <DetailsCardSpan label="Registered Screens" text={`${screenNum} screens`} />
                    <DetailsCardSpan label="Registered Seats" text={`${seatNum} seats`} />
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreDetailsCard;
