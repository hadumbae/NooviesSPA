/**
 * @file Compact summary card for user reservations.
 * @filename MyReservationCompactCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {formatReservationDetails} from "@/domains/reservation/formatters/formatReservationDetails.ts";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import {PopulatedReservation} from "@/domains/reservation/schema/model";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";

/**
 * Props for the {@link MyReservationCompactCard} component.
 */
type CardProps = {
    /** The fully populated reservation entity to be displayed. */
    reservation: PopulatedReservation;
};

/**
 * A clickable UI card that presents a high-level overview of a specific reservation.
 * @param props - Component properties containing the reservation data.
 */
const MyReservationCompactCard = ({reservation}: CardProps) => {
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
                        src={posterImage?.secure_url}
                        alt={`${movieTitle} Poster`}
                        className="h-52 lg:h-60"
                    />
                </section>
                <div className="flex-1 space-y-3">
                    <section className="flex-1 flex flex-col items-center gap-2 lg:gap-3">
                        <SectionHeader srOnly={true}>
                            Reservation : Showing Metadata
                        </SectionHeader>

                        <h2 className={cn(
                            PrimaryTextBaseCSS,
                            "font-oswald font-extrabold line-clamp-1",
                            "text-lg"
                        )}>
                            {movieTitle}
                        </h2>

                        <SecondarySpan>{showtime}</SecondarySpan>
                        <SecondarySpan>{runtime} • {reservationType}</SecondarySpan>

                        <div className="flex items-center gap-10">
                            <LabeledGroup label="Tickets">
                                <PrimarySpan>{ticketCount} tickets</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Price">
                                <PrimarySpan>${pricePaid} Total</PrimarySpan>
                            </LabeledGroup>
                        </div>
                    </section>

                    <Separator/>

                    <section className="flex flex-col items-center space-y-3">
                        <PrimarySpan className="font-bold text-lg lg:text-xl">
                            ||| {uniqueCode} |||
                        </PrimarySpan>
                        <ReservationStatusBadge status={status}/>
                    </section>
                </div>

            </CardContent>
        </Card>
    );
};

export default MyReservationCompactCard;
