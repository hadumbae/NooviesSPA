/**
 * @fileoverview Detailed data section displaying movie, showtime, and transactional metadata for a reservation.
 */

import {ReactElement} from "react";
import {Card, CardContent, Separator} from "@/common/components/ui";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";
import {cn} from "@/common/_feat";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {OrientationValues} from "@/common/_schemas/enums/OrientationEnumSchema.ts";
import {PageSectionHeader} from "@/views/common/_comp/page";

import {buildShowingDateString} from "@/domains/showings";
import {AdminReservation} from "@/domains/reservations";
import {MoviePosterImage} from "@/views/admin/movies";

/** Props for the ReservationByCodeDetailsSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/** Renders a comprehensive block including movie details and booking specifics for a reservation. */
export function ReservationByCodeDetailsSection(
    {reservation}: SectionProps
): ReactElement {
    const {
        snapshot: {
            movie: {title, runtime, genres, posterURL, releaseDate},
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
        <section className="space-y-4">
            <PageSectionHeader text="Related Data"/>

            <div className="flex space-x-3">
                <MoviePosterImage className="h-36 md:h-48" url={posterURL}/>

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
                            <LabeledGroup className="md:col-span-2" label="Showtime" orientation={labelOrientation}>
                                <span className="primary-text">{showtime}</span>
                            </LabeledGroup>

                            <LabeledGroup label="Price" orientation={labelOrientation}>
                                <span className="primary-text">{pricePaid} {currency} for {ticketCount} Tickets</span>
                            </LabeledGroup>

                            <LabeledGroup label="Type" orientation={labelOrientation}>
                                <span className="primary-text">{resType}</span>
                            </LabeledGroup>

                            <LabeledGroup
                                className="md:col-span-2"
                                label={isExpired ? "Expired" : "Expires At"}
                                orientation={labelOrientation}
                            >
                                <span className={cn("primary-text", isExpired && "text-red-500")}>
                                    {expiryDate}
                                </span>
                            </LabeledGroup>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}