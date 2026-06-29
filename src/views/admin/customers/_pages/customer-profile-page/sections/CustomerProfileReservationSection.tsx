/**
 * @fileoverview Layout section for displaying a grid of customer reservation cards in the admin profile.
 */

import {UserUniqueCode} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts";
import {Reservation} from "@/domains/reservation/_schema/model";
import {CustomerReservationCard} from "@/views/admin/customers/_comp";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {ReactElement} from "react";

/** Props for the CustomerProfileReservationSection component. */
type SectionProps = {
    code: UserUniqueCode;
    itemCount: number;
    reservations: Reservation[];
};

/** Renders a structured grid of reservation summaries with a descriptive header. */
export function CustomerProfileReservationSection(
    {code, itemCount, reservations}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text={`Reservations (${itemCount})`}/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((reservation) => (
                    <CustomerReservationCard
                        code={code}
                        key={reservation._id}
                        reservation={reservation}/>
                ))}
            </div>
        </section>
    );
}