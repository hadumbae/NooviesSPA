/**
 * @fileoverview Card component that displays formatted reservation summary details.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {formatReservationDetails, PopulatedReservation} from "@/domains/reservations";

/** Props for the MyReservationInfoCard component. */
export type CardProps = {
    reservation: PopulatedReservation;
};

/** Renders a card containing summary information for a specific reservation. */
export function MyReservationInfoCard(
    {reservation}: CardProps
): ReactElement {
    const {
        status,
        ticketCount,
        pricePaid,
        uniqueCode,
        formatted: {showtime, reservationType},
    } = formatReservationDetails(reservation);

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <section className="flex justify-between items-center">
                    <SROnly text="Reservation Meta"/>

                    <h2 className="subsection-title">{showtime}</h2>
                    <span className="secondary-text">{reservationType}</span>
                </section>

                <section className="flex justify-between items-center">
                    <LabeledGroup label="Price">
                        <span className="primary-text">${pricePaid}</span>
                    </LabeledGroup>

                    <LabeledGroup label="Tickets">
                        <span className="primary-text">{ticketCount} u.</span>
                    </LabeledGroup>

                    <LabeledGroup label="Status">
                        <span className="primary-text">{status}</span>
                    </LabeledGroup>
                </section>

                <section className="flex justify-between items-center">
                    <LabeledGroup label="Code">
                        <span className="primary-text">{uniqueCode}</span>
                    </LabeledGroup>
                </section>
            </CardContent>
        </Card>
    );
}
