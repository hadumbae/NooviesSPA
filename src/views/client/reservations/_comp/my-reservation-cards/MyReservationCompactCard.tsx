/**
 * @fileoverview Compact summary card for displaying user reservation details.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {ReservationStatusBadge} from "@/views/client/reservations/_comp/reservation-badges";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {formatReservationDetails, PopulatedReservation} from "@/domains/reservations";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {LabelContent} from "@/views/common/_comp";

type CardProps = {
    reservation: PopulatedReservation;
};

/** Clickable UI card that presents a high-level overview of a specific reservation. */
export function MyReservationCompactCard(
    {reservation}: CardProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const {
        slug,
        uniqueCode,
        formatted,
        status,
        ticketCount,
        pricePaid,
        showing: {movie: {posterImage}}
    } = formatReservationDetails(reservation);

    const {movieTitle, reservationType, showtime, runtime} = formatted;

    /**
     * Navigates to the full reservation detail page.
     */
    const navigateToReservation = () => {
        navigate({
            level: "log",
            to: `/account/reservations/${slug}`,
            message: "Navigate to user's reservation.",
            component: MyReservationCompactCard.name,
        });
    };

    return (
        <Card className="hover:cursor-pointer transition-colors hover:bg-muted/50" onClick={navigateToReservation}>
            <CardContent className="p-4 space-x-3 flex items-center">
                <section>
                    <MoviePosterImage
                        url={posterImage?.secure_url}
                        alt={`${movieTitle} Poster`}
                        className="h-52 lg:h-60"
                    />
                </section>
                <div className="flex-1 space-y-3">
                    <section className="flex-1 flex flex-col items-center gap-2 lg:gap-3">
                        <SROnly text="Reservation : Showing Metadata"/>

                        <h2 className="primary-text font-oswald font-extrabold line-clamp-1 text-lg">
                            {movieTitle}
                        </h2>

                        <span className="secondary-text">{showtime}</span>
                        <span className="secondary-text">{runtime} • {reservationType}</span>

                        <div className="flex items-center gap-10">
                            <LabelContent orientation="horizontal" label="Tickets">
                                <span className="primary-text">{ticketCount} tickets</span>
                            </LabelContent>

                            <LabelContent orientation="horizontal" label="Price">
                                <span className="primary-text">${pricePaid} Total</span>
                            </LabelContent>
                        </div>
                    </section>

                    <Separator/>

                    <section className="flex flex-col items-center space-y-3">
                        <span className="primary-text font-bold text-lg lg:text-xl">
                            ||| {uniqueCode} |||
                        </span>
                        <ReservationStatusBadge status={status}/>
                    </section>
                </div>

            </CardContent>
        </Card>
    );
}
