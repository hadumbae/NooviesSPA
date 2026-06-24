/**
 * @fileoverview Component for displaying a summary card of a theatre in the admin index list.
 */

import {ReactElement} from 'react';
import {Clapperboard, Sofa, TvMinimal} from "lucide-react";
import {Card, CardContent} from "@/common/components/ui";
import generateLocationAddressString from "@/common/utility/features/location/generateLocationAddressString.ts";
import TooltipStatItem from "@/common/components/stat-details/TooltipStatItem.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

import {TheatreDetails} from "@/domains/theatres";

/** Props for the TheatreIndexCard component. */
type TheatreIndexCardProps = {
    theatre: TheatreDetails;
};

/**
 * Displays a summary card for a theatre including its name, address, and key statistics.
 */
export function TheatreIndexCard({theatre}: TheatreIndexCardProps): ReactElement {
    const {name, location, seatCount, screenCount, futureShowingCount, slug} = theatre;
    const addressString = generateLocationAddressString(location);

    return (
        <LoggedLink to={`/admin/theatres/get/${slug}`}>
            <Card className="hover:shadow-md">
                <CardContent className="flex-grow space-y-2 p-4">
                    <h1 className="text-xl font-extrabold">{name}</h1>
                    <h2 className="text-neutral-400 text-sm">{addressString}</h2>
                    <div className="text-neutral-400 gap-10 flex items-center">
                        <TooltipStatItem
                            tooltip={`${screenCount} Screens`}
                            text={screenCount.toString()}
                            icon={TvMinimal}
                            iconSize={15}
                            srLabel="Theatre Screens"
                        />

                        <TooltipStatItem
                            tooltip={`${futureShowingCount} Upcoming Showings`}
                            text={futureShowingCount.toString()}
                            icon={Clapperboard}
                            iconSize={15}
                            srLabel="Theatre Upcoming Showings"
                        />

                        <TooltipStatItem
                            tooltip={`${seatCount} Seats`}
                            text={seatCount.toString()}
                            icon={Sofa}
                            iconSize={15}
                            srLabel="Theatre Seats"
                        />
                    </div>
                </CardContent>
            </Card>
        </LoggedLink>
    );
}
