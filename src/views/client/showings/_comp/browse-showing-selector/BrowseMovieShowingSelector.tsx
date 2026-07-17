/**
 * @fileoverview Component for selecting a specific movie showing from a list during the browsing flow.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {PopulatedShowing, ShowingDetails} from "@/domains/showings";
import {ShowingInfoLanguages} from "@/views/client/showings/_comp/showing-info-details";

/** Props for the BrowseMovieShowingSelector component. */
type SummaryProps = {
    showing: PopulatedShowing | ShowingDetails;
    className?: string;
};

/** Card-like selector that displays showing time, language options, and a link to the booking page. */
export function BrowseMovieShowingSelector(
    {showing, className}: SummaryProps,
): ReactElement {
    const {slug, language, subtitleLanguages, startTime, theatre: {location: {timezone}}} = showing;
    const formattedStartTime = startTime.setZone(timezone).toFormat("hh:mma • dd MMM yy");

    return (
        <div className={cn(
            "flex flex-col justify-between space-y-3",
            className
        )}>
            <ShowingInfoLanguages
                language={language}
                subtitleLanguages={subtitleLanguages}
            />

            <div className="flex justify-between items-center">
                <span className="secondary-text text-sm font-bold">
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
