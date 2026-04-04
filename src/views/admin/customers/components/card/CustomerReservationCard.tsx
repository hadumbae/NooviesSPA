// CustomerReservationCard.tsx

import {Reservation} from "@/domains/reservation/schema/model";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";

type CardProps = {
    reservation: Reservation;
};

export const CustomerReservationCard = (
    {reservation}: CardProps
) => {
    const {
        ticketCount,
        pricePaid,
        currency,
        uniqueCode,
        status,
        snapshot: {
            movie: {title, posterURL},
            theatre: {timezone},
            startTime,
            isSpecialEvent
        }
    } = reservation;

    const showtime = startTime.setZone(timezone).toFormat("HH:mm • dd MMM, yy")

    return (
        <Card>
            <CardContent className="p-4 flex items-center gap-3">
                <PosterImage
                    className="h-28 md:h-40"
                    src={posterURL}
                    alt={`${title} Poster Image`}
                />

                <div className="flex-1 space-y-2">
                    <div className="text-center">
                        <h2 className="subsection-title">{title}</h2>
                        <h3 className="subsection-subtitle">{showtime}</h3>
                    </div>

                    <Separator/>

                    <div className="flex justify-center items-center space-x-2 primary-text">
                        <span className="font-semibold">{ticketCount} tickets</span>
                        <span>|</span>
                        <span className="font-semibold">{pricePaid} {currency}</span>
                        <span>|</span>
                        <span className="font-semibold">{isSpecialEvent ? "Special" : "Standard"}</span>
                    </div>

                    <Separator/>

                    <div className="flex flex-col items-center space-y-2">
                        <span className="subsection-title">{uniqueCode}</span>
                        <ReservationStatusBadge status={status}/>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};