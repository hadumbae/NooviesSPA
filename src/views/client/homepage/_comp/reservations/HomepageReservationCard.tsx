/**
 * @fileoverview Card component for displaying a reservation summary on the homepage.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {ReservationSummary} from "@/domains/reservations";
import {MoviePosterImage} from "@/views/admin/movies";
import {Clock, MapPin} from "lucide-react";
import {TheatreScreenTypeBadge} from "@/views/admin/theatre-screens";

/** Props for the HomepageReservationCard component. */
type CardProps = {
    reservation: ReservationSummary;
};

/** Displays reservation details including movie poster, showtime, theatre location, screen info, and ticket details. */
export function HomepageReservationCard(
    {reservation}: CardProps
): ReactElement {
    const {snapshot, ticketCount, reservationType} = reservation;
    const {
        startTime,
        movie: {posterURL, title},
        theatre: {name: theatreName},
        screen: {name: screenName, screenType},
        selectedSeats
    } = snapshot;

    const formattedStartTime = startTime.toFormat("hh:mm a • dd LLL, yyyy");
    const seating = selectedSeats?.map(({seatLabel, seatIdentifier}) => seatLabel ?? seatIdentifier).join(", ");
    const purchaseDisplay = reservationType === "GENERAL_ADMISSION"
        ? `General Admission • ${ticketCount} Tickets`
        : `Seats ${seating} • ${ticketCount} Tickets`

    return (
        <Card>
            <CardContent className="p-0 flex items-stretch space-x-2">
                <MoviePosterImage url={posterURL} className="h-40 rounded-l-md"/>
                <div className="py-3 pr-3 flex-1 flex flex-col space-y-2">
                    <h3 className="subsection-title">{title}</h3>

                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-1.5">
                            <Clock size={13} className="shrink-0 text-muted-foreground"/>
                            <span className="subsection-description">{formattedStartTime}</span>
                        </div>

                        <div className="grid grid-cols-[13px_1fr] gap-x-1.5 gap-y-0.5 items-start">
                            <MapPin size={13} className="mt-0.5 shrink-0 text-muted-foreground"/>
                            <span className="subsection-description">{theatreName}</span>
                            <span/>
                            <span className="secondary-text text-xs flex items-center gap-1.5">
                                    {screenName}
                                <TheatreScreenTypeBadge type={screenType} className="text-[10px] px-1.5 py-0.5"/>
                                </span>
                        </div>
                    </div>

                    <span className="secondary-text text-xs font-bold">{purchaseDisplay}</span>
                </div>
            </CardContent>
        </Card>
    );
}