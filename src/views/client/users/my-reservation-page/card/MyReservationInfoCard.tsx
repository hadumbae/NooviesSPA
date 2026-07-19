/**
 * @fileoverview Card component that displays formatted reservation summary details.
 */

import {ReactElement} from "react";
import {SROnly} from "@/views/common/_comp";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {formatReservationDetails, PopulatedReservation} from "@/domains/reservations";
import {LabelContent} from "@/views/common/_comp";

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
                    <LabelContent orientation="horizontal" label="Price">
                        <span className="primary-text">${pricePaid}</span>
                    </LabelContent>

                    <LabelContent orientation="horizontal" label="Tickets">
                        <span className="primary-text">{ticketCount} u.</span>
                    </LabelContent>

                    <LabelContent orientation="horizontal" label="Status">
                        <span className="primary-text">{status}</span>
                    </LabelContent>
                </section>

                <section className="flex justify-between items-center">
                    <LabelContent orientation="horizontal" label="Code">
                        <span className="primary-text">{uniqueCode}</span>
                    </LabelContent>
                </section>
            </CardContent>
        </Card>
    );
}
