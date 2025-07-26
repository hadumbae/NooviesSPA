import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Clapperboard, Search, Sofa, TvMinimal} from "lucide-react";
import getAddressString from "@/common/utility/location/getAddressString.ts";
import StatItem from "@/common/components/stat-details/StatItem.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import TooltipStatItem from "@/common/components/stat-details/TooltipStatItem.tsx";

/**
 * Props for the `TheatreIndexCard` component.
 */
type TheatreIndexCardProps = {
    /**
     * Full details of the theatre to display, including metadata like seat count,
     * screen count, and scheduled showings.
     */
    theatre: TheatreDetails;
};

/**
 * Displays a card containing summary information about a theatre.
 * Includes the theatre's name, address, number of screens, seat count,
 * and upcoming showings. Each statistic is shown with an icon and tooltip.
 *
 * @param theatre - The theatre details used to populate the card.
 */
const TheatreIndexCard: FC<TheatreIndexCardProps> = ({theatre}) => {
    const {_id, name, location, seatCount, screenCount, futureShowingCount} = theatre;
    const addressString = getAddressString(location);

    const screenCountStat = (
        <TooltipStatItem
            tooltip={`${screenCount} Screens`}
            text={screenCount.toString()}
            icon={TvMinimal}
            iconSize={15}
            srLabel="Theatre Screens"
        />
    );

    const showingCount = (
        <Tooltip>
            <TooltipContent>{futureShowingCount} Upcoming Showings</TooltipContent>
            <TooltipTrigger>
                <StatItem
                    text={futureShowingCount.toString()}
                    icon={Clapperboard}
                    iconSize={15}
                    srLabel="Theatre Upcoming Showings"
                />
            </TooltipTrigger>
        </Tooltip>
    );

    const theatreSeatCount = (
        <Tooltip>
            <TooltipContent>{seatCount} Seats</TooltipContent>
            <TooltipTrigger>
                <StatItem
                    text={seatCount.toString()}
                    icon={Sofa}
                    iconSize={15}
                    srLabel="Theatre Seats"
                />
            </TooltipTrigger>
        </Tooltip>
    );

    return (
        <Card>
            <CardContent className="p-4 flex">
                <section className="flex-grow space-y-2">
                        <h1 className="text-xl font-extrabold">{name}</h1>
                        <h2 className="text-neutral-400 text-sm">{addressString}</h2>
                        <div className="text-neutral-400 gap-10 flex items-center">
                            {screenCountStat}
                            {theatreSeatCount}
                            {showingCount}
                        </div>
                </section>

                <section className="flex justify-end items-center">
                    <ButtonLink to={`/admin/theatres/get/${_id}`} variant="outline">
                        <Search />
                    </ButtonLink>
                </section>

            </CardContent>
        </Card>
    );
};

export default TheatreIndexCard;
