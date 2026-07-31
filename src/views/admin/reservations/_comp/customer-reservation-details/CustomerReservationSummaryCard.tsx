/**
 * @fileoverview Summary card component showing snapshot details of a customer's movie reservation.
 */

import {ReactElement} from "react";
import {AdminReservation, Reservation} from "@/domains/reservations";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {LabelContent} from "@/views/common/_comp";
import {cn, convertToTitleCase, useIsMobile} from "@/common/_feat";
import {OrientationValues} from "@/common/_schemas";
import {formatMovieRuntime} from "@/domains/movies";
import {buildShowingDateString} from "@/domains/showings";

/** Props for the CustomerReservationSummaryCard component. */
type CardProps = {
    reservation: Reservation | AdminReservation;
};

/**
 * Renders an administrative summary card container populated with specific details of a customer reservation.
 */
export function CustomerReservationSummaryCard(
    {reservation}: CardProps
): ReactElement {
    const {
        snapshot: {
            movie: {title, runtime, genres, releaseDate},
            theatre: {timezone},
            startTime,
            endTime,
        },
        reservationType,
        pricePaid,
        currency,
        ticketCount,
        expiresAt,
    } = reservation;

    const isMobile = useIsMobile();
    const labelOrientation: OrientationValues = isMobile ? "vertical" : "horizontal";

    const movieGenres = genres.length > 0 ? genres.join(", ") : "-"
    const movieRuntime = formatMovieRuntime(runtime, true)
    const movieReleaseYear = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    const showtime = buildShowingDateString({start: startTime, end: endTime, timezone});
    const resType = convertToTitleCase(reservationType.replace("_", " "));

    const expiryDate = expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");
    const isExpired = new Date() > expiresAt.toJSDate();

    return (
        <Card className="flex-1">
            <CardContent className="p-3 space-y-2">
                <div className="space-y-1">
                    <h2 className="subsection-title">{title}</h2>
                    <div className="flex max-md:flex-col max-md:space-y-1 md:space-x-5">
                        <h3 className="subsection-subtitle">{movieReleaseYear} • {movieRuntime}</h3>
                        <h3 className="subsection-subtitle">{movieGenres}</h3>
                    </div>
                </div>

                <Separator/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <LabelContent
                        classNames={{container: "md:col-span-2"}}
                        label="Showtime"
                        orientation={labelOrientation}
                    >
                        <span className="primary-text">{showtime}</span>
                    </LabelContent>

                    <LabelContent label="Price" orientation={labelOrientation}>
                        <span className="primary-text">
                            {pricePaid} {currency} for {ticketCount} Tickets
                        </span>
                    </LabelContent>

                    <LabelContent label="Type" orientation={labelOrientation}>
                        <span className="primary-text">{resType}</span>
                    </LabelContent>

                    <LabelContent
                        classNames={{container: "md:col-span-2"}}
                        label={isExpired ? "Expired" : "Expires At"}
                        orientation={labelOrientation}
                    >
                        <span className={cn("primary-text", isExpired && "text-red-500")}>
                            {expiryDate}
                        </span>
                    </LabelContent>
                </div>
            </CardContent>
        </Card>
    );
}