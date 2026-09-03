/**
 * @fileoverview Card component for displaying theatre information and capacity statistics on the homepage.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {TheatreDetails} from "@/domains/theatres";
import {Building} from "lucide-react";

/** Props for the HomepageTheatreCard component. */
type CardProps = {
    theatre: TheatreDetails;
};

/** Displays summary details for a theatre including its location, screen count, total seats, and upcoming showtimes. */
export function HomepageTheatreCard(
    {theatre: {name, screenCount, seatCount, futureShowingCount, location: {city, country}}}: CardProps
): ReactElement {
    return (
        <Card>
            <CardContent className="p-3 space-y-4">
                <div className="grid grid-cols-[13px_1fr] gap-x-1.5 gap-y-0.5 items-center">
                    <Building size={13} className="mt-0.5 shrink-0 text-muted-foreground"/>
                    <span className="subsection-title">{name}</span>
                    <span/>
                    <span className="secondary-text text-xs">{city}, {country}</span>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                        <span className="primary-text font-bold">{screenCount}</span>
                        <span className="secondary-text text-xs md:text-sm">Screens</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="primary-text font-bold">{seatCount}</span>
                        <span className="secondary-text text-xs md:text-sm">Seats</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="primary-text font-bold">{futureShowingCount}</span>
                        <span className="secondary-text text-xs md:text-sm">Upcoming</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}