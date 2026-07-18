/**
 * @fileoverview Administrative card displaying a summary of a movie showing.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {BadgeAlert, Circle, Cog, DollarSign, Search, Theater, TvMinimal,} from "lucide-react";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {IconButton} from "@/views/common/_comp";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {ShowingDetails} from "@/domains/showings";

/** Props for the ShowingSummaryCard component. */
type CardProps = {
    showing: ShowingDetails;
};

/**
 * Renders an administrative summary card for a movie showing with metadata and navigation links.
 */
export function ShowingSummaryCard({showing}: CardProps): ReactElement {
    const {
        _id,
        movie,
        theatre,
        screen,
        startTime,
        endTime,
        ticketPrice,
        status,
        config: {
            isSpecialEvent,
            isActive,
        }
    } = showing;

    const {runtime} = movie;
    const {name: theatreName, slug: theatreSlug} = theatre;
    const {name: screenName, screenType, slug: screenSlug} = screen;

    const formattedStatus = convertToTitleCase(status);
    const formattedRuntime = formatMovieRuntime(runtime);
    const formattedStartTime = startTime.toFormat("MMM dd, yyyy (hh:mm)");
    const formattedTimeMetadata = buildString([endTime?.toFormat("MMM dd, yyyy (hh:mm)"), formattedRuntime], " • ");

    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-3">
                <div className="flex justify-between items-center">
                    <section>
                        <h2 className="subsection-title">{formattedStartTime}</h2>
                        <h3 className="subsection-subtitle text-xs">{formattedTimeMetadata}</h3>
                    </section>

                    <div>
                        <LoggedLink to={`/admin/showings/get/${_id}`}>
                            <IconButton>
                                <Search/>
                            </IconButton>
                        </LoggedLink>
                    </div>
                </div>

                <div className="rounded-container-border grid grid-cols-2 gap-1 p-2 select-none">
                    <span className="rounded-container-border text-with-icon px-2">
                        <DollarSign/> {ticketPrice}
                    </span>

                    <span className="rounded-container-border text-with-icon px-2">
                        <Cog/> {formattedStatus}
                    </span>

                    <span className="rounded-container-border text-with-icon px-2">
                        <BadgeAlert/> {isSpecialEvent ? "Special" : "Normal"} Event
                    </span>

                    <span className="rounded-container-border text-with-icon px-2">
                        <Circle/> {isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="flex justify-between">
                    <HoverLink
                        to={`/admin/theatres/get/${theatreSlug}`}
                        className="text-xs"
                    >
                        <Theater/> {theatreName}
                    </HoverLink>

                    <HoverLink
                        to={`/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`}
                        className="text-xs"
                    >
                        <TvMinimal/> {screenName} ({screenType})
                    </HoverLink>
                </div>
            </CardContent>
        </Card>
    );
}