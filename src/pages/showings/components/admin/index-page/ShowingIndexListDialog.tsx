import {FC} from "react";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui/dialog.tsx";
import ShowingIndexListCard from "@/pages/showings/components/admin/index-page/ShowingIndexListCard.tsx";
import formatShowingDetails from "@/pages/showings/utilities/formatShowingDetails.ts";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import LucideIconText from "@/common/components/card-content/LucideIconText.tsx";
import {
    BadgeAlert,
    Captions,
    Circle,
    Clock,
    Cog,
    Headphones,
    Landmark,
    Presentation,
    Search,
    Ticket,
} from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";
import {ContainerCSS} from "@/common/constants/css/ContainerCSS.ts";
import {
    HeaderTextCSS,
    PrimaryTextBaseCSS,
    SecondaryTextBaseCSS,
    SubheaderTextCSS
} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link ShowingIndexListDialog} component.
 *
 * @property showing - The full showing details object containing movie, theatre,
 * and scheduling information.
 */
type ShowingIndexListDialogProps = {
    showing: ShowingDetails;
};

/**
 * **ShowingIndexListDialog**
 *
 * Displays a modal dialog containing expanded details for a single movie showing.
 * Triggered by clicking a {@link ShowingIndexListCard}, this dialog provides
 * movie metadata, theatre details, runtime, audio/subtitle info, and ticket pricing.
 *
 * @description
 * This component enhances the admin showings index by allowing quick inspection
 * of a showing’s details without leaving the page.
 *
 * **Displayed sections include:**
 * - **Movie Summary:** Poster, title, year, genre, runtime
 * - **Showing Details:** Theatre, screen, schedule, and type
 * - **Audio/Subtitles:** Language and caption information
 * - **Synopsis:** Expandable textblock for the movie description
 * - **Navigation:** A button to view the full admin detail page
 *
 * @example
 * ```tsx
 * <ShowingIndexListDialog showing={showingData} />
 * ```
 */
const ShowingIndexListDialog: FC<ShowingIndexListDialogProps> = ({showing}) => {
    const {_id, movie, theatre, isSpecialEvent, isActive, ticketPrice} = showing;
    const {posterImage, synopsis} = movie;
    const {
        location: {country},
    } = theatre;

    const {
        movieTitle,
        theatreName,
        screenName,
        screenType,
        dateString,
        runtimeString,
        releaseYear,
        formattedStatus,
        genreString,
        audioLanguageString,
        subtitleString,
    } = formatShowingDetails(showing);

    /** Renders the showing status section under the dialog title. */
    const descSection = (
        <section className="flex max-sm:justify-center items-center space-x-3">
            <LucideIconText
                icon={Cog}
                text={formattedStatus}
            />

            <LucideIconText
                icon={Circle}
                className={isActive ? "text-green-500" : "text-red-500"}
                text={isActive ? "Active" : "Inactive"}
            />

            <LucideIconText
                icon={BadgeAlert}
                className={isSpecialEvent ? "text-green-500" : ""}
                text={isSpecialEvent ? "Special Event" : "Regular Event"}
            />
        </section>
    );

    return (
        <Dialog>
            <DialogTrigger>
                <ShowingIndexListCard showing={showing}/>
            </DialogTrigger>

            <DialogContent className={cn(ContainerCSS, "bg-white space-y-2")}>
                <DialogHeader>
                    <DialogTitle className={PrimaryTextBaseCSS}>{movieTitle} ({releaseYear})</DialogTitle>
                    <DialogDescription className={SecondaryTextBaseCSS}>{descSection}</DialogDescription>
                </DialogHeader>

                {/* Movie header section */}
                <section className="flex items-center gap-4">
                    <SectionHeader srOnly={true}>Movie Details</SectionHeader>

                    <MoviePosterImage
                        className="w-14 xl:w-14"
                        src={posterImage?.secure_url}
                        disableDialog={true}
                    />

                    <div className="flex flex-col gap-1">
                        <h1 className={cn(HeaderTextCSS)}>{movieTitle}</h1>
                        <h2 className={cn(SubheaderTextCSS, "text-sm")}>{releaseYear} • {runtimeString}</h2>
                        <h3 className={cn(SubheaderTextCSS, "text-xs")}>{genreString}</h3>
                    </div>
                </section>

                <Separator/>

                {/* Showing details */}
                <section className="grid grid-cols-1 gap-4">
                    <SectionHeader srOnly={true}>Showing Details</SectionHeader>

                    <div className="grid grid-cols-2 gap-1">
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
                            text={`$${ticketPrice.toString()} per ticket`}
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

                {/* Movie synopsis */}
                <section>
                    <CollapsibleTextblock
                        text={synopsis}
                        className="text-neutral-400 text-sm"
                        openText="About The Movie"
                        closeText="Close Movie Synopsis"
                    />
                </section>

                {/* Navigation link */}
                <LoggedAnchor
                    href={`/admin/showings/get/${_id}`}
                    target="_blank"
                    className={cn(buttonVariants({variant: "primary"}), "w-full")}
                >
                    <Search/> Details
                </LoggedAnchor>
            </DialogContent>
        </Dialog>
    );
};

export default ShowingIndexListDialog;
