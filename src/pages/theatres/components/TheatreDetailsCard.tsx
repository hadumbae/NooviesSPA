import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import getAddressString from "@/common/utility/location/getAddressString.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link TheatreDetailsCard} component.
 */
interface Props {
    /**
     * Theatre details object containing general information
     * such as name, seating capacity, and location.
     */
    theatre: TheatreDetails;
}

/**
 * Displays detailed information about a theatre, including
 * general details (name, seats, screens, upcoming showings)
 * and location details (address, timezone, postal code, coordinates).
 *
 * @component
 * @example
 * ```tsx
 * <TheatreDetailsCard theatre={theatreData} />
 * ```
 *
 * @param {Props} props - The props object.
 * @param {TheatreDetails} props.theatre - The theatre details to display.
 *
 * @returns {JSX.Element} A card containing theatre information.
 */
const TheatreDetailsCard: FC<Props> = ({theatre}) => {
    const {name, location, seatCapacity, screenCount, seatCount, futureShowingCount} = theatre;
    const {timezone, postalCode, coordinates} = location;

    const address = getAddressString(location);

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
};

export default TheatreDetailsCard;
