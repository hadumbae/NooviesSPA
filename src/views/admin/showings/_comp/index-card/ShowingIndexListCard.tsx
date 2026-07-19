/**
 * @fileoverview Card component for displaying movie showing summaries in the admin dashboard.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui/card.tsx";
import {formatShowingDetails} from "@/domains/showings/_feat/formatters/formatShowingDetails.ts";
import {DollarSign, Star} from "lucide-react";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {ShowingIsActiveBadge, ShowingStatusBadge} from "@/views/admin/showings/_comp/badges";

/** Props for the ShowingIndexListCard component. */
type ShowingIndexListCardProps = {
    showing: ShowingDetails;
};

/**
 * Displays a summary card for a movie showing including theatre, timing, and status information.
 */
export function ShowingIndexListCard(
    {showing}: ShowingIndexListCardProps
): ReactElement {
    const {
        status,
        ticketPrice,
        config: {isSpecialEvent, isActive},
        movie: {posterImage},
        theatre: {location: {country}},
    } = showing;

    const {
        movie: {title: movieTitle},
        screen: {name: screenName},
        theatre: {name: theatreName},
        formatted: {releaseYear, dateString, languageString},
    } = formatShowingDetails(showing);

    return (
        <Card>
            <CardHeader className='p-0'>
                <MoviePosterImage
                    url={posterImage?.secure_url}
                    className="rounded-b-none h-52"
                />
            </CardHeader>
            <CardContent className="p-4 flex flex-col space-y-4">
                <div className="space-y-1 justify-start">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-extrabold">{movieTitle} ({releaseYear})</h1>
                        {isSpecialEvent && <Star className="text-green-500" size={20}/>}
                    </div>

                    <h2 className="text-sm font-bold text-neutral-600 text-left">
                        {screenName} • {theatreName} • {country}
                    </h2>
                </div>

                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-neutral-400">{dateString}</h3>
                    <h3 className="text-sm font-bold text-neutral-400">{languageString}</h3>
                </div>

                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <ShowingStatusBadge status={status}/>
                        <ShowingIsActiveBadge isActive={isActive}/>
                    </div>

                    <span className="text-with-icon secondary-text">
                        <DollarSign/>
                        {ticketPrice?.toString() ?? "Unpriced"}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
