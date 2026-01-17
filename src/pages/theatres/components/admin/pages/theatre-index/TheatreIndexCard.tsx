import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {Clapperboard, Sofa, TvMinimal} from "lucide-react";
import generateLocationAddressString from "@/common/utility/features/location/generateLocationAddressString.ts";
import StatItem from "@/common/components/stat-details/StatItem.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import TooltipStatItem from "@/common/components/stat-details/TooltipStatItem.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

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
    const {name, location, seatCount, screenCount, futureShowingCount, slug} = theatre;
    const addressString = generateLocationAddressString(location);

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
        <LoggedLink to={`/admin/theatres/get/${slug}`}>
            <Card className="hover:shadow-md">
                <CardContent className="flex-grow space-y-2 p-4">
                    <h1 className="text-xl font-extrabold">{name}</h1>
                    <h2 className="text-neutral-400 text-sm">{addressString}</h2>
                    <div className="text-neutral-400 gap-10 flex items-center">
                        {screenCountStat}
                        {theatreSeatCount}
                        {showingCount}
                    </div>
                </CardContent>
            </Card>
        </LoggedLink>
    );
};

export default TheatreIndexCard;
