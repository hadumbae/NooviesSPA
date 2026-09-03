/**
 * @fileoverview Card component for displaying upcoming showing details on the homepage.
 */

import {ReactElement} from "react";
import {ShowingSummary} from "@/domains/showings";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui";
import {MoviePosterImage} from "@/views/admin/movies";
import {Clock, MapPin} from "lucide-react";
import {ShowingSpecialEventBadge, ShowingStatusBadge} from "@/views/admin/showings";

/** Props for the HomepageShowingCard component. */
type CardProps = {
    showing: ShowingSummary;
};

/** Displays a preview card for a movie showing including venue, timing, poster, and pricing info. */
export function HomepageShowingCard(
    {showing}: CardProps
): ReactElement {
    const {movie, startTime, theatreSnapshot, ticketPrice, status} = showing;
    const {title, tagline, posterImage} = movie;
    const {name: theatreName, timezone, city, country} = theatreSnapshot;

    const formattedTime = startTime.setZone(timezone).toFormat("hh:mm a • dd LLL, yyyy");

    return (
        <Card>
            <CardHeader className="p-0">
                <div className="relative">
                    <ShowingSpecialEventBadge
                        isSpecialEvent={true}
                        className="absolute w-fit left-4 top-4"
                    />

                    <MoviePosterImage
                        url={posterImage?.secure_url}
                        className="rounded-t-xl rounded-0 h-32 w-full aspect-square"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
                <div>
                    <h3 className="subsection-title">{title}</h3>
                    <h4 className="subsection-subtitle max-lg:text-xs truncate">{tagline}</h4>
                </div>

                <div className="space-y-2">
                    <div className="flex space-x-3 items-center justify-start">
                        <Clock size={15}/>
                        <span className="primary text-sm font-extrabold">{formattedTime}</span>
                    </div>

                    <div className="flex space-x-3 items-center justify-start">
                        <MapPin size={15}/>
                        <div className="flex flex-col">
                            <span className="primary-text text-sm font-extrabold">{theatreName}</span>
                            <span className="secondary-text text-sm font-bold">{city}, {country}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="primary-text font-extrabold">${ticketPrice}</span>
                    <ShowingStatusBadge status={status}/>
                </div>
            </CardContent>
        </Card>
    );
}