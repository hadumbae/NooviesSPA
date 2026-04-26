/**
 * @fileoverview Card component for displaying comprehensive theatre information, including administrative metrics and geographic location details.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import generateLocationAddressString from "@/common/utility/features/location/generateLocationAddressString.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import {cn} from "@/common/lib/utils.ts";

/** Props for the TheatreDetailsCard component. */
type CardProps = {
    theatre: TheatreDetails;
}

/**
 * Renders a structured overview of a theatre's general capacity metrics and localized address information.
 */
export function TheatreDetailsCard({theatre}: CardProps): ReactElement {
    const {name, location, seatCapacity, screenCount, seatCount, futureShowingCount} = theatre;
    const {timezone, postalCode, coordinates} = location;

    const address = generateLocationAddressString(location);

    return (
        <Card>
            <CardContent className="p-4 flex flex-col gap-7">
                <section>
                    <h1 className="font-extrabold uppercase">General Details</h1>
                    <Separator/>
                </section>

                <section className="space-y-4">
                    <DetailsCardSpan label="Name" text={name}/>

                    <div className={cn("grid grid-cols-2 gap-4", "2xl:grid-cols-4")}>
                        <DetailsCardSpan label="Seats" text={`${seatCount} seats`}/>
                        <DetailsCardSpan label="Seat Capacity" text={`${seatCapacity} seats`}/>
                        <DetailsCardSpan label="Screens" text={`${screenCount} screens`}/>
                        <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                    </div>
                </section>

                <section>
                    <h1 className="font-extrabold uppercase">Location</h1>
                    <Separator/>
                </section>

                <section className="space-y-4">
                    <DetailsCardSpan label="Address" text={address}/>

                    <div className={cn("grid grid-cols-2 gap-4", "2xl:grid-cols-4")}>
                        <DetailsCardSpan label="Timezone" text={timezone}/>
                        <DetailsCardSpan label="Postal Code" text={postalCode ?? "-"}/>
                        <DetailsCardSpan label="Longitude" text={coordinates?.coordinates[0] ?? "-"}/>
                        <DetailsCardSpan label="Latitude" text={coordinates?.coordinates[1] ?? "-"}/>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}