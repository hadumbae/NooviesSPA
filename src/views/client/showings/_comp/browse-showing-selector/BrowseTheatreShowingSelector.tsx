/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {IANATimezone} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {ShowingDetails} from "@/domains/showings";
import {BrowseShowingSelector} from "@/views/client/showings/_comp";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp";

/** Props for the BrowseTheatreShowingSelector component. */
type SummaryProps = {
    timezone: IANATimezone;
    showing: ShowingDetails;
    className?: string;
};

/** Displays a movie poster alongside a selector of a specific showtime. */
export function BrowseTheatreShowingSelector(
    {showing, timezone, className}: SummaryProps,
): ReactElement {
    const {movie: {posterImage}} = showing;

    return (
        <div className={cn("flex items-stretch space-x-2", className)}>
            <MoviePosterImageDialog
                url={posterImage?.secure_url}
                className="h-52 rounded-r-none aspect-[2/3]"
            />

            <BrowseShowingSelector
                showing={showing}
                timezone={timezone}
                className="flex-1 p-3"
            />
        </div>
    );
}
