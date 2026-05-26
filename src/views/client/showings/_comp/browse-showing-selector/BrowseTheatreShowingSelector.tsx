/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {cn} from "@/common/lib/utils.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {ReactElement} from "react";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {BrowseShowingSelector} from "@/views/client/showings/_comp/browse-showing-selector/BrowseShowingSelector.tsx";

/** Props for the BrowseTheatreShowingSelector component. */
type SummaryProps = {
    showing: PopulatedShowing | ShowingDetails;
    className?: string;
};

/** Displays a movie poster alongside a selector of a specific showtime. */
export function BrowseTheatreShowingSelector(
    {showing, className}: SummaryProps,
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
                className="flex-1 p-3"
            />
        </div>
    );
}
