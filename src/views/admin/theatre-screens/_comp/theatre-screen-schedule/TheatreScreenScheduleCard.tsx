/**
 * @fileoverview Card component for displaying showing schedule details for a theatre screen.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {BadgeAlert, Circle, Cog, DollarSign,} from "lucide-react";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {ShowingDetails} from "@/domains/showings";
import {MoviePosterImage} from "@/views/admin/movies";
import {Link} from "react-router-dom";

/** Props for the TheatreScreenSchedule component. */
type CardProps = {
    showing: ShowingDetails;
};

/** Renders a summary card showing movie schedule, pricing, and status information for a theatre screen. */
export function TheatreScreenScheduleCard({showing}: CardProps): ReactElement {
    const {
        startTime,
        endTime,
        ticketPrice,
        status,
        slug,
        config: {isSpecialEvent, isActive},
        movie: {title, runtime, posterImage},
    } = showing;

    const formattedStatus = convertToTitleCase(status);
    const formattedRuntime = formatMovieRuntime(runtime);
    const formattedStartTime = startTime.toFormat("MMM dd, yyyy (hh:mm)");
    const formattedTimeMetadata = buildString([endTime?.toFormat("MMM dd, yyyy (hh:mm)"), formattedRuntime], " • ");

    return (
        <Link to={`/admin/showings/get/${slug}`}>
            <Card>
                <CardHeader className='p-0'>
                    <MoviePosterImage
                        url={posterImage?.secure_url}
                        className="rounded-b-none h-52"
                    />
                </CardHeader>
                <CardContent className="px-5 py-3 space-y-3">
                    <section>
                        <h2 className="subsection-title">{title}</h2>
                        <h3 className="subsection-subtitle text-xs">{formattedStartTime} • {formattedTimeMetadata}</h3>
                    </section>


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
                </CardContent>
            </Card>
        </Link>
    );
}