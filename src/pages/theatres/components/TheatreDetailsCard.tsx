import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import getAddressString from "@/common/utility/location/getAddressString.ts";
import {Separator} from "@/common/components/ui/separator.tsx";

interface Props {
    theatre: TheatreDetails;
}

const TheatreDetailsCard: FC<Props> = ({theatre}) => {
    const {name, location, seatCapacity, screenCount, seatCount, futureShowingCount} = theatre;
    const {timezone, postalCode, coordinates} = location;

    const address = getAddressString(location);

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                <section>
                    <h1 className="font-extrabold uppercase">General Details</h1>
                    <Separator/>
                </section>


                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <section className="col-span-2 lg:col-span-4">
                        <DetailsCardSpan label="Name" text={name}/>
                    </section>
                    <DetailsCardSpan label="Seats" text={`${seatCount} seats`}/>
                    <DetailsCardSpan label="Seat Capacity" text={`${seatCapacity} seats`}/>
                    <DetailsCardSpan label="Screens" text={`${screenCount} screens`}/>
                    <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                </div>


                <section>
                    <h1 className="font-extrabold uppercase">Location</h1>
                    <Separator/>
                </section>

                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-2 lg:col-span-4">
                        <DetailsCardSpan label="Address" text={address}/>
                    </div>
                    <DetailsCardSpan label="Timezone" text={timezone}/>
                    <DetailsCardSpan label="Postal Code" text={postalCode ?? "-"}/>
                    <DetailsCardSpan label="Longitude" text={coordinates?.coordinates[0] ?? "-"}/>
                    <DetailsCardSpan label="Latitude" text={coordinates?.coordinates[1] ?? "-"}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default TheatreDetailsCard;
