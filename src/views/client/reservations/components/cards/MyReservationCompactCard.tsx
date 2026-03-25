/**
 * @file Compact summary card for user reservations.
 * @filename MyReservationCompactCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {formatReservationDetails} from "@/domains/reservation/formatters/formatReservationDetails.ts";
import SecondarySpan from "@/views/common/components/text/SecondarySpan.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import PrimarySpan from "@/views/common/components/text/PrimarySpan.tsx";
import {PopulatedReservation} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";

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
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start space-x-2">
                    <section>
                        <PosterImage
                            src={posterImage?.secure_url}
                            alt={`${movieTitle} Poster`}
                            className="h-28"
                        />
                    </section>

                    <section className="flex-1 flex flex-col gap-4">
                        <SectionHeader srOnly={true}>
                            Reservation : Showing Metadata
                        </SectionHeader>

                        <h2 className={cn(PrimaryTextBaseCSS, "font-bold line-clamp-1")}>
                            {movieTitle}
                        </h2>

                        <PrimarySpan>{showtime}</PrimarySpan>

                        <div className="flex justify-between items-center">
                            <LabeledGroup label="Tickets">
                                <PrimarySpan>{ticketCount}</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Price">
                                <PrimarySpan>$ {pricePaid}</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Code">
                                <PrimarySpan>{uniqueCode}</PrimarySpan>
                            </LabeledGroup>
                        </div>
                    </section>
                </div>

                <section className="flex justify-between items-center">
                    <SecondarySpan>{runtime} Runtime</SecondarySpan>
                    <SecondarySpan>{status}</SecondarySpan>
                    <SecondarySpan>{reservationType}</SecondarySpan>
                </section>
            </CardContent>
        </Card>
    );
};

export default MyReservationCompactCard;
