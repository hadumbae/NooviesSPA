/**
 * @fileoverview Summary metadata section for a specific reservation record.
 */

import {AdminReservation} from "@/domains/reservations/_schema/model";
import {ReservationStatusBadge} from "@/views/client/reservations/_comp/reservation-badges/ReservationStatusBadge.tsx";
import {ReactElement} from "react";

/** Props for the ReservationByCodeMetadataSection component. */
type SectionProps = {
    reservation: AdminReservation
};

/** Displays key identifying information for a reservation in a horizontal layout. */
export function ReservationByCodeMetadataSection(
    {reservation: {uniqueCode, slug, status}}: SectionProps
): ReactElement {
    return (
        <section className="flex justify-between items-center">
            <div className="space-y-1">
                <h2 className="section-title text-2xl">{uniqueCode}</h2>
                <h3 className="section-subtitle text-xs italic">{slug}</h3>
            </div>

            <div>
                <ReservationStatusBadge status={status}/>
            </div>
        </section>
    );
}