/**
 * @file MyReservationInfoCard.tsx
 * Displays formatted reservation summary details.
 */

import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {formatReservationDetails} from "@/pages/reservation/formatters/formatReservationDetails.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import SecondarySpan from "@/features/common/text/SecondarySpan.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import PrimarySpan from "@/features/common/text/PrimarySpan.tsx";

/**
 * Props for MyReservationInfoCard.
 */
type CardProps = {
    reservation: ReservationDetails;
};

/**
 * Renders reservation summary information.
 */
const MyReservationInfoCard = ({reservation}: CardProps) => {
    const {
        status,
        ticketCount,
        pricePaid,
        formatted: {showtime, reservationType},
    } = formatReservationDetails(reservation);

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <section className="flex justify-between items-center">
                    <SectionHeader srOnly>
                        Reservation Meta
                    </SectionHeader>

                    <PrimaryHeaderText>
                        {showtime}
                    </PrimaryHeaderText>

                    <SecondarySpan>
                        {reservationType}
                    </SecondarySpan>
                </section>

                <section className="flex justify-between items-center">
                    <LabeledGroup label="Price">
                        <PrimarySpan>
                            ${pricePaid}
                        </PrimarySpan>
                    </LabeledGroup>

                    <LabeledGroup label="Tickets">
                        <PrimarySpan>
                            {ticketCount} u.
                        </PrimarySpan>
                    </LabeledGroup>

                    <LabeledGroup label="Status">
                        <PrimarySpan>
                            {status}
                        </PrimarySpan>
                    </LabeledGroup>
                </section>
            </CardContent>
        </Card>
    );
};

export default MyReservationInfoCard;
