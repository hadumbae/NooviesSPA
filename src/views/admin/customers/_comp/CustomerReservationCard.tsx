/**
 * @file Interactive card component for displaying and accessing customer reservation details.
 * @filename CustomerReservationCard.tsx
 */

import {Reservation} from "@/domains/reservation/schema/model";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";
import {CustomerReservationDialog} from "@/views/admin/customers/_comp/CustomerReservationDialog.tsx";
import {useState} from "react";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";

/**
 * Properties for the CustomerReservationCard component.
 * ---
 */
type CardProps = {
    /** The unique identifier of the customer owner. */
    code: UserUniqueCode;
    /** The specific reservation data to render. */
    reservation: Reservation;
};

/**
 * An interactive summary card that triggers a detailed administrative dialog on click.
 * ---
 */
export const CustomerReservationCard = (
    {code, reservation}: CardProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

    /** Format showtime to theater-local format. */
    const showtime = startTime.setZone(timezone).toFormat("HH:mm • dd MMM, yy")

    return (
        <Card>
            <CardContent
                className="p-4 flex items-center gap-3 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <MoviePosterImage
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

            <CustomerReservationDialog
                code={code}
                reservation={reservation}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </Card>
    );
};