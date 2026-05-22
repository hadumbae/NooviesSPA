/**
 * @fileoverview Modal dialog for viewing expanded movie showing details in the admin dashboard.
 */

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui/dialog.tsx";
import {ShowingIndexListCard} from "@/views/admin/showings/_comp/index-card/ShowingIndexListCard.tsx";
import {formatShowingDetails} from "@/domains/showings/_feat/formatters/formatShowingDetails.ts";
import {LucideIconText} from "@/common/components/card-content/LucideIconText.tsx";
import {Captions, Clock, Headphones, Landmark, Presentation, Search, Ticket,} from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";
import {ContainerCSS} from "@/common/constants/css/ContainerCSS.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";
import {ShowingMovieSummary} from "@/views/admin/movies/_comp/showing-movie-summary";
import {ShowingStateBadges} from "@/views/admin/showings/_comp/showing-state-badges";

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

            <DialogContent className={cn(ContainerCSS, "bg-white space-y-2")}>
                <DialogHeader>
                    <DialogTitle className={PrimaryTextBaseCSS}>{movieTitle} ({releaseYear})</DialogTitle>
                    <DialogDescription className="hidden">Data</DialogDescription>
                    <ShowingStateBadges status={status} isActive={isActive} isSpecialEvent={isSpecialEvent}/>
                </DialogHeader>

                <ShowingMovieSummary
                    movie={movie}
                    to={`/admin/movies/get/${movieSlug}`}
                />

                <Separator/>

                <section className="grid grid-cols-1 gap-4">
                    <SectionHeader srOnly={true}>Showing Details</SectionHeader>

                    <div className="grid grid-cols-2 gap-2">
                        <LucideIconText
                            className={cn(PrimaryTextBaseCSS, "col-span-2")}
                            icon={Clock}
                            text={dateString}
                        />

                        <LucideIconText
                            className={cn(SecondaryTextBaseCSS, "text-xs")}
                            icon={Landmark}
                            text={`${theatreName} (${country})`}
                        />

                        <LucideIconText
                            className={cn(SecondaryTextBaseCSS, "text-xs")}
                            icon={Presentation}
                            text={`${screenName} • ${screenType}`}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <LucideIconText
                            className={cn(PrimaryTextBaseCSS)}
                            icon={Ticket}
                            text={`$${ticketPrice ? ticketPrice.toString() : "0"} per ticket`}
                        />

                        <LucideIconText
                            className={cn(SecondaryTextBaseCSS, "text-xs")}
                            icon={Headphones}
                            text={audioLanguageString}
                        />

                        <LucideIconText
                            className={cn(SecondaryTextBaseCSS, "text-xs")}
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
