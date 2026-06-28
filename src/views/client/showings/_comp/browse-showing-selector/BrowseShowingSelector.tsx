/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {ReactElement} from "react";
import {cn} from "@/common/lib/utils.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {ShowingWithMovie} from "@/domains/showings";
import {ShowingInfoLanguages, ShowingInfoMovieMeta} from "@/views/client/showings/_comp/showing-info-details";

/** Props for the TheatreShowingSelectSummary component. */
type SummaryProps = {
    showing: ShowingWithMovie;
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

                <ButtonLink
                    to={`/browse/showings/${slug}`}
                    type="button"
                    variant="primary"
                    size="sm"
                    className="uppercase"
                >
                    Select
                </ButtonLink>
            </div>
        </div>
    );
}

