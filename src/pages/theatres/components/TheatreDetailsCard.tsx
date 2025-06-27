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
            <CardContent className="p-4 flex flex-col space-y-4">
                <DetailsCardSpan label="Name" text={name}/>

                <DetailsCardSpan label="Location" text={location}/>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    <DetailsCardSpan
                        label="Seats / Capacity"
                        text={`${seatCount} / ${seatCapacity} seats`}
                    />

                    <DetailsCardSpan
                        label="Screens"
                        text={`${screenCount} screens`}
                    />

                    <DetailsCardSpan
                        label="Upcoming Showings"
                        text={`${futureShowingCount} showings`}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default TheatreDetailsCard;
