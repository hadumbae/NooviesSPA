/**
 * @fileoverview Section component for displaying a list of the authenticated user's current reservations on the client homepage.
 */

import {ReactElement} from "react";
import {ReservationSummary} from "@/domains/reservations";
import {PageSectionHeader} from "@/views/common/_comp";
import {HomepageReservationCard} from "@/views/client/homepage/_comp";

/** Props for the HomepageYourReservationsSection component. */
type Props = {
    reservations: ReservationSummary[];
};

/** Displays a section containing cards for each of the user's active reservations. */
export function HomepageYourReservationsSection(
    {reservations}: Props
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text="Your Reservations"/>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {reservations.map((reservation) => (
                    <HomepageReservationCard key={reservation._id} reservation={reservation}/>
                ))}
            </div>
        </section>
    );
}