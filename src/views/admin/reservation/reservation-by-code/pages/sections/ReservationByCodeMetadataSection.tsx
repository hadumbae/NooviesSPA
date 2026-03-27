/**
 * @file Summary metadata section for a specific reservation record.
 * @filename ReservationByCodeMetadataSection.tsx
 */

import {AdminReservation} from "@/domains/reservation/schema/model";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";

/**
 * Props for the {@link ReservationByCodeMetadataSection} component.
 */
type SectionProps = {
    /** The administrative reservation record containing identity and status data. */
    reservation: AdminReservation
};

/**
 * Displays key identifying information for a reservation in a horizontal layout.
 */
export const ReservationByCodeMetadataSection = (
    {reservation}: SectionProps
) => {
    const {uniqueCode, slug, status} = reservation;

    return (
        <section className="flex justify-between items-center">
            <div className="space-y-1">
                <PrimaryHeaderText as="h2" className="text-2xl">
                    {uniqueCode}
                </PrimaryHeaderText>

                <SecondaryHeaderText as="h3" className="text-xs italic" >
                    {slug}
                </SecondaryHeaderText>
            </div>

            <div>
                <ReservationStatusBadge status={status} />
            </div>
        </section>
    );
};