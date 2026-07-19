/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {IANATimezone} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {ShowingDetails} from "@/domains/showings";
import {ShowingInfoLanguages, ShowingInfoMovieMeta} from "@/views/client/showings/_comp/showing-info-details";
import {buttonVariants} from "@/views/common/_comp/ui";
import {Link} from "react-router-dom";

/** Props for the TheatreShowingSelectSummary component. */
type SummaryProps = {
    showing: ShowingDetails;
    timezone: IANATimezone
    className?: string;
};

/**
 * Displays a summary of a movie showing including poster, metadata, and language options.
 */
export function BrowseShowingSelector(
    {showing, timezone, className}: SummaryProps,
): ReactElement {
    const {movie, config, language, subtitleLanguages, slug, startTime} = showing;
    const {isSpecialEvent, canReserveSeats} = config;

    const formattedStartTime = startTime
        .setZone(timezone)
        .toFormat("hh:mma • dd MMM yy");

    return (
        <div className={cn("flex flex-col justify-between space-y-3", className)}>
            <ShowingInfoMovieMeta
                movie={movie}
                isSpecialEvent={isSpecialEvent}
                canReserveSeats={canReserveSeats}
            />

            <ShowingInfoLanguages
                language={language}
                subtitleLanguages={subtitleLanguages}
            />

            <div className="flex justify-between items-center">
                <span className="secondary-text text-sm font-semibold">
                    {formattedStartTime}
                </span>

                <Link to={`/browse/showings/${slug}`} type="button" className={cn(
                    "uppercase",
                    buttonVariants({variant: "primary", size: "sm"}),
                )}>
                    Select
                </Link>
            </div>
        </div>
    );
}

