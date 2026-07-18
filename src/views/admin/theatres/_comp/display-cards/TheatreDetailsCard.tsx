/**
 * @fileoverview Card component for displaying comprehensive theatre information, including administrative metrics and geographic location details.
 */

import {ReactElement} from 'react';
import {Card, CardContent, Separator} from "@/common/components/ui";
import {DetailsCardSpan} from "@/views/common/_comp/text-display/spans/DetailsCardSpan.tsx";
import {
    generateLocationAddressString
} from "@/common/_feat/formatters/generateLocationAddressString.ts";
import {cn} from "@/common/_feat";

import {TheatreDetails} from "@/domains/theatres/_schema";

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
            <CardContent className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-7">
                <section className="space-y-2">
                    <div>

                        <h1 className="font-extrabold uppercase">General Details</h1>
                        <Separator/>
                    </div>

                    <div className="space-y-4">
                        <DetailsCardSpan label="Name" text={name}/>

                        <div className={cn("grid grid-cols-2 gap-4", "2xl:grid-cols-4")}>
                            <DetailsCardSpan label="Seats" text={`${seatCount} seats`}/>
                            <DetailsCardSpan label="Seat Capacity" text={`${seatCapacity} seats`}/>
                            <DetailsCardSpan label="Screens" text={`${screenCount} screens`}/>
                            <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                        </div>
                    </div>
                </section>


                <section className="space-y-2">
                    <div>
                        <h1 className="font-extrabold uppercase">Location</h1>
                        <Separator/>
                    </div>

                    <div className="space-y-4">
                        <DetailsCardSpan label="Address" text={address}/>

                        <div className={cn("grid grid-cols-2 gap-4", "2xl:grid-cols-4")}>
                            <DetailsCardSpan label="Timezone" text={timezone}/>
                            <DetailsCardSpan label="Postal Code" text={postalCode ?? "-"}/>
                            <DetailsCardSpan label="Longitude" text={coordinates?.coordinates[0] ?? "-"}/>
                            <DetailsCardSpan label="Latitude" text={coordinates?.coordinates[1] ?? "-"}/>
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}