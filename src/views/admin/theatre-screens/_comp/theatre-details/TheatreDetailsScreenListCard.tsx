/**
 * @fileoverview Card component for displaying a summary of theatre screen data in a list.
 */

import {ReactElement} from "react";
import {Card, CardContent, Progress, Separator} from "@/common/components/ui";
import {TheatreScreenTypeBadge} from "@/views/admin/theatre-screens/_comp/badges";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens";
import {
    TheatreDetailsScreenStatsMetric
} from "@/views/admin/theatre-screens/_comp/theatre-details/TheatreDetailsScreenStatsMetric.tsx";

/** Props for the TheatreDetailsScreenListCard component. */
type CardProps = {
    theatreSlug: SlugString;
    screen: TheatreScreenWithVirtuals;
};

/**
 * Renders a summary card for a theatre screen including metrics and registration progress.
 */
export function TheatreDetailsScreenListCard(
    {theatreSlug, screen}: CardProps
): ReactElement {
    const {name, screenType, slug, capacity, seatCount, futureShowingCount,} = screen;
    const registeredCapacity = Math.floor((seatCount / capacity) * 100);

    return (
        <LoggedLink to={`/admin/theatres/get/${theatreSlug}/screen/${slug}`}>
            <Card className="hover:shadow-md">
                <CardContent className="p-3 space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="subsection-title">{name}</h3>
                            <p className="secondary-text text-sm font-bold">{slug}</p>
                        </div>

                        <TheatreScreenTypeBadge type={screenType}/>
                    </div>

                    <Separator/>

                    <div className="grid grid-cols-3 gap-2">
                        <TheatreDetailsScreenStatsMetric label="Seats" count={seatCount}/>
                        <TheatreDetailsScreenStatsMetric label="Capacity" count={capacity}/>
                        <TheatreDetailsScreenStatsMetric label="Showings" count={futureShowingCount}/>
                    </div>

                    <Separator/>

                    <div className="flex justify-between items-center space-x-2">
                        <span className="secondary-text font-medium">
                            {seatCount}/{capacity} seats registered
                        </span>

                        <Progress value={registeredCapacity} className="w-1/3"/>
                    </div>
                </CardContent>
            </Card>
        </LoggedLink>
    );
}