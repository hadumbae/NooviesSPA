/**
 * @fileoverview Compact summary card for displaying user reservation details.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {PopulatedReservation} from "@/domains/reservations";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {Separator} from "@/views/common/_comp/ui";
import {ReservationStatusBadge} from "@/views/client/reservations";

type CardProps = {
    reservation: PopulatedReservation;
};

/** Clickable UI card that presents a high-level overview of a specific reservation. */
export function MyReservationCompactCard(
    {reservation}: CardProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {
        ticketCount,
        pricePaid,
        snapshot: {startTime, movie: {title: movieTitle, posterURL, releaseDate, runtime}},
        slug: reservationSlug,
        uniqueCode,
        status,
    } = reservation;

    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased.";
    const startingTime = startTime.toFormat("dd LLL, yyyy • hh:mm a");
    const duration = formatMovieRuntime(runtime, true);

    /**
     * Navigates to the full reservation detail page.
     */
    const navigateToReservation = () => {
        navigate({
            level: "log",
            to: `/account/reservations/${reservationSlug}`,
            message: "Navigate to user's reservation.",
            component: MyReservationCompactCard.name,
        });
    };

    return (
        <Card className="hover:cursor-pointer transition-colors hover:bg-muted/50" onClick={navigateToReservation}>
            <CardContent className="p-0 space-x-1 flex items-stretch">
                <div className="relative">
                    <ReservationStatusBadge
                        className="absolute left-2 top-2"
                        status={status}
                    />

                    <MoviePosterImage
                        url={posterURL}
                        alt={`${movieTitle} Poster`}
                        className="h-52 rounded-l-xl"
                    />
                </div>

                <div className="flex-1 flex flex-col p-4 space-y-3">
                    <div className="flex-1">
                        <h3 className="subsection-title truncate">{movieTitle} ({releaseYear})</h3>
                        <h4 className="subsection-subtitle">{startingTime} • {duration}</h4>
                        <p className="primary-text text-sm font-normal">{ticketCount} tickets • ${pricePaid}</p>
                    </div>

                    <Separator/>

                    <span className="secondary-text text-sm font-bold">
                        {uniqueCode}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
