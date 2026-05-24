/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {cn} from "@/common/lib/utils.ts";
import {formatShowingInfo} from "@/domains/showings/_feat/formatters/formatShowingInfo.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {ReactElement} from "react";
import {ShowingInfoLanguages, ShowingInfoMovieMeta} from "@/views/client/showings/_comp/showing-info-details";

/** Props for the TheatreShowingSelectSummary component. */
type SummaryProps = {
    showing: PopulatedShowing | ShowingDetails;
    className?: string;
};

/**
 * Displays a summary of a movie showing including poster, metadata, and language options.
 */
export function BrowseShowingSelector(
    {showing, className}: SummaryProps,
): ReactElement {
    const {movie, config, language, subtitleLanguages} = showing;
    const {showingSlug, formattedStartTime} = formatShowingInfo(showing);

    return (
        <div className={cn(
            "flex flex-col justify-between space-y-3",
            className
        )}>
            <ShowingInfoMovieMeta
                movie={movie}
                isSpecialEvent={config.isSpecialEvent}
                canReserveSeats={config.canReserveSeats}
            />

            <ShowingInfoLanguages
                language={language}
                subtitleLanguages={subtitleLanguages}
            />

            <div className="flex justify-between items-center">
                <span className="secondary-text text-sm">
                    {formattedStartTime}
                </span>

                <ButtonLink
                    to={`/browse/showings/${showingSlug}`}
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

