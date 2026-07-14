/**
 * @fileoverview Modal dialog for viewing expanded movie showing details in the admin dashboard.
 */

import {ReactElement} from "react";
import {LucideIconText} from "@/common/components/card-content/LucideIconText.tsx";
import {Captions, Clock, Headphones, Landmark, Presentation, Search, Ticket} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {CollapsibleTextblock} from "@/common/components/text/CollapsibleTextblock.tsx";
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
                        <LucideIconText
                            className="primary-text col-span-2"
                            icon={Clock}
                            text={dateString}
                        />

                        <LucideIconText
                            className="secondary-text text-xs"
                            icon={Landmark}
                            text={`${theatreName} (${country})`}
                        />

                        <LucideIconText
                            className="secondary-text text-xs"
                            icon={Presentation}
                            text={`${screenName} • ${screenType}`}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <LucideIconText
                            className="primary-text"
                            icon={Ticket}
                            text={`$${ticketPrice ? ticketPrice.toString() : "0"} per ticket`}
                        />

                        <LucideIconText
                            className="secondary-text text-xs"
                            icon={Headphones}
                            text={audioLanguageString}
                        />

                        <LucideIconText
                            className="secondary-text text-xs"
                            icon={Captions}
                            text={subtitleString}
                        />
                    </div>
                </section>

                <Separator/>

                <CollapsibleTextblock
                    text={synopsis}
                    className="text-neutral-400 text-sm"
                    openText="About The Movie"
                    closeText="Close Movie Synopsis"
                />

                <LoggedAnchor
                    href={`/admin/showings/get/${slug}`}
                    target="_blank"
                    className={cn(buttonVariants({variant: "primary"}), "w-full")}
                >
                    <Search/> Details
                </LoggedAnchor>
            </DialogContent>
        </Dialog>
    );
}
