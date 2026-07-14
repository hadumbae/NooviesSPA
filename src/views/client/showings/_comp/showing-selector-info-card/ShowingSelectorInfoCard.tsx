/**
 * @fileoverview A card component that displays detailed information about a specific movie showing for client selection.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader, Separator} from "@/common/components/ui";
import {ISO6391LanguageLabels} from "@/common/_const/languages/ISO6391LanguageLabels.ts";

import {ShowingDetails} from "@/domains/showings";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp";
import {ShowingSpecialEventBadge, ShowingTypeBadge} from "@/views/admin/showings";
import {ShowingInfoMovieMeta, ShowingInfoPremises} from "@/views/client/showings/_comp/showing-info-details";

/** Props for the ShowingSelectorInfoCard component. */
type CardProps = {
    showing: ShowingDetails;
    className?: string;
};

/** Displays movie details, showtime, and location information for a specific showing. */
export function ShowingSelectorInfoCard(
    {showing, className}: CardProps
): ReactElement {
    const {
        movie,
        theatre,
        screen,
        startTime,
        language,
        subtitleLanguages,
        config: {canReserveSeats, isSpecialEvent},
    } = showing;

    const {posterImage} = movie;
    const showtime = startTime.toFormat("hh:mm a • dd MMM yy");
    const languageString = `${ISO6391LanguageLabels[language]}, SUB: ${subtitleLanguages.join(", ").toUpperCase()}`;

    return (
        <Card className={className}>
            <CardHeader className="p-0">
                <MoviePosterImageDialog
                    url={posterImage?.secure_url}
                    className="h-52 rounded-b-none"
                />
            </CardHeader>
            <CardContent className="p-4 space-y-5">
                <ShowingInfoMovieMeta
                    movie={movie}
                    isSpecialEvent={isSpecialEvent}
                    canReserveSeats={canReserveSeats}
                />

                <div className="flex max-md:flex-col max-md:space-y-2 md:justify-between md:items-center">
                    <span className="font-bold italic">{showtime}</span>
                    <span className="font-semibold">{languageString}</span>
                </div>

                <div className="space-x-2">
                    <ShowingSpecialEventBadge isSpecialEvent={isSpecialEvent}/>
                    <ShowingTypeBadge canReserveSeats={canReserveSeats}/>
                </div>

                <Separator/>

                <ShowingInfoPremises
                    theatre={theatre}
                    screen={screen}
                />
            </CardContent>
        </Card>
    );
}