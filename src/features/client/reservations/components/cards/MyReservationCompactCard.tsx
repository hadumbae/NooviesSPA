/**
 * @file MyReservationCompactCard.tsx
 *
 * Compact reservation summary card used in profile and preview contexts.
 *
 * @remarks
 * - Displays a condensed, read-only snapshot of a reservation.
 * - Optimised for list views such as profile pages and dashboards.
 * - Navigates to the full reservation detail page on interaction.
 * - **INCOMPLETE**: visual hierarchy and data density are provisional.
 */

import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {formatReservationDetails} from "@/pages/reservation/formatters/formatReservationDetails.ts";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";

type CardProps = {
    /** Reservation data rendered in compact card form */
    reservation: ReservationDetails;
};

/**
 * Renders a clickable compact reservation card.
 *
 * Formats reservation data for display and routes the user
 * to the full reservation detail view when selected.
 */
const MyReservationCompactCard = ({reservation}: CardProps) => {
    const navigate = useLoggedNavigate();

    const {slug, formatted, status, ticketCount, pricePaid, posterImage} =
        formatReservationDetails(reservation);

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
        <Card className="hover:cursor-pointer" onClick={navigateToReservation}>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start space-x-2">
                    <section>
                        <PosterImage
                            src={posterImage?.secure_url}
                            className="h-28"
                        />
                    </section>

                    <section className="flex flex-col gap-4">
                        <SectionHeader srOnly={true}>
                            Reservation : Showing Metadata
                        </SectionHeader>

                        <h2 className={cn(PrimaryTextBaseCSS, "font-bold")}>{movieTitle}</h2>

                        <PrimarySpan>{showtime}</PrimarySpan>

                        <div className="flex justify-between items-center">
                            <LabeledGroup label="Tickets">
                                <PrimarySpan>{ticketCount}</PrimarySpan>
                            </LabeledGroup>

                            <LabeledGroup label="Price">
                                <PrimarySpan>$ {pricePaid}</PrimarySpan>
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
