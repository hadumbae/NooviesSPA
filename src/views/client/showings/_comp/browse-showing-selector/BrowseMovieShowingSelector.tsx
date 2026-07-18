/**
 * @fileoverview Component for selecting a specific movie showing from a list during the browsing flow.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {PopulatedShowing, ShowingDetails} from "@/domains/showings";
import {ShowingInfoLanguages} from "@/views/client/showings/_comp/showing-info-details";
import {Link} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui";

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

                <Link to={`/browse/showings/${slug}`} type="button" className={cn(
                    "uppercase",
                    buttonVariants({variant: "primary", size: "sm"})
                )}>
                    Select
                </Link>
            </div>
        </div>
    );
}
