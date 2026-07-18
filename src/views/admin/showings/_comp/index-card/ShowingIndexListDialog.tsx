/**
 * @fileoverview Modal dialog for viewing expanded movie showing details in the admin dashboard.
 */

import {ReactElement} from "react";
import {Captions, Clock, Headphones, Landmark, Presentation, Search, Ticket} from "lucide-react";
import {cn} from "@/common/_feat";
import {CollapsibleTextblock} from "@/views/common/_comp/text-display/text-blocks/CollapsibleTextblock.tsx";
import {
    buttonVariants,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Separator,
} from "@/common/components/ui";

import {formatShowingDetails, ShowingDetails} from "@/domains/showings";
import {ShowingMovieSummary} from "@/views/admin/movies/_comp/showing-movie-summary";
import {ShowingStateBadges} from "@/views/admin/showings/_comp/showing-state-badges";
import {ShowingIndexListCard} from "@/views/admin/showings/_comp/index-card/ShowingIndexListCard.tsx";
import {SROnly} from "@/views/common/_comp";
import {Link} from "react-router-dom";

/** Props for the ShowingIndexListDialog component. */
type ShowingIndexListDialogProps = {
    showing: ShowingDetails;
};

/**
 * Displays a modal containing metadata, scheduling, and pricing for a specific movie showing.
 */
export function ShowingIndexListDialog(
    {showing}: ShowingIndexListDialogProps
): ReactElement {
    const {status, movie, theatre, ticketPrice, slug, config: {isSpecialEvent, isActive}} = showing;
    const {synopsis, slug: movieSlug} = movie;
    const {location: {country}} = theatre;

    const {
        movie: {title: movieTitle},
        theatre: {name: theatreName},
        screen: {name: screenName, screenType},
        formatted: {
            dateString,
            releaseYear,
            audioLanguageString,
            subtitleString,
        }
    } = formatShowingDetails(showing);

    return (
        <Dialog>
            <DialogTrigger>
                <ShowingIndexListCard showing={showing}/>
            </DialogTrigger>

            <DialogContent className="default-container bg-white space-y-2">
                <DialogHeader>
                    <DialogTitle className="primary-text">{movieTitle} ({releaseYear})</DialogTitle>
                    <DialogDescription className="hidden">Data</DialogDescription>
                    <ShowingStateBadges status={status} isActive={isActive} isSpecialEvent={isSpecialEvent}/>
                </DialogHeader>

                <ShowingMovieSummary movie={movie} to={`/admin/movies/get/${movieSlug}`}/>

                <Separator/>

                <section className="grid grid-cols-1 gap-4">
                    <SROnly text="Showing Details"/>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-with-icon primary-text col-span-2">
                            <Clock/>
                            {dateString}
                        </span>

                        <span className="text-with-icon secondary-text text-xs">
                            <Landmark/>
                            {theatreName} ({country})
                        </span>

                        <span className="text-with-icon secondary-text text-xs">
                            <Presentation/>
                            {screenName} • {screenType}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-with-icon primary-text">
                            <Ticket/>
                            ${ticketPrice ? ticketPrice.toString() : "0"} per ticket
                        </span>

                        <span className="text-with-icon secondary-text text-xs">
                            <Headphones/>
                            {audioLanguageString}
                        </span>

                        <span className="text-with-icon secondary-text text-xs">
                            <Captions/>
                            {subtitleString}
                        </span>
                    </div>
                </section>

                <Separator/>

                <CollapsibleTextblock
                    text={synopsis}
                    className="text-neutral-400 text-sm"
                    openText="About The Movie"
                    closeText="Close Movie Synopsis"
                />

                <Link
                    to={`/admin/showings/get/${slug}`}
                    target="_blank"
                    className={cn(buttonVariants({variant: "primary"}), "w-full")}
                >
                    <Search/> Details
                </Link>
            </DialogContent>
        </Dialog>
    );
}
