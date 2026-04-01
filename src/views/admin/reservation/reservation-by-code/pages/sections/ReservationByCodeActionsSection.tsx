// ReservationByCodeActionsSection.tsx

import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import {AdminReservation} from "@/domains/reservation/schema/model";

type SectionProps = {
    reservation: AdminReservation;
};

export const ReservationByCodeActionsSection = (
    {reservation}: SectionProps
) => {
    console.log("Reservation Actions For: ", reservation);

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Actions" />

            <div className="grid grid-cols-1 gap-4">

            </div>
        </section>
    );
};