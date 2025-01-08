import {FC} from 'react';
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";

interface Props {
    theatre: Theatre;
}

const TheatreDetailsCard: FC<Props> = ({theatre}) => {
    const {
        name,
        location,
        numberOfSeats,
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
                    <DetailsCardSpan label="Seat Capacity" text={`${numberOfSeats} seats`} />
                    <DetailsCardSpan label="Registered Screens" text={`${screenNum} screens`} />
                    <DetailsCardSpan label="Registered Seats" text={`${seatNum} seats`} />
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreDetailsCard;
