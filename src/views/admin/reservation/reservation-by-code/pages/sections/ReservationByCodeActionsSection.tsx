/**
 * @file Layout section containing administrative action triggers for a reservation.
 * @filename ReservationByCodeActionsSection.tsx
 */

import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    AdminReservationCancelAction,
    AdminReservationRefundAction,
    AdminReservationResetExpiryAction
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/components/reservation-status/ReservationStatusBadge.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the {@link ReservationByCodeActionsSection} component.
 */
type SectionProps = {
    /** The reservation record used to populate and scope the administrative actions. */
    reservation: AdminReservation;
};

/**
 * A dedicated interface section for high-level reservation management tasks.
 */
export const ReservationByCodeActionsSection = (
    {reservation}: SectionProps
) => {
    const {uniqueCode, isPaid, status} = reservation;
    const hasNoActions = status === "EXPIRED" || (status === "CANCELLED" && !isPaid) || status === "REFUNDED";

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Actions"/>

            {
                hasNoActions &&
                <div className={cn(
                    "p-4 md:p-10 h-10 border-2 rounded-3xl",
                    "flex justify-between items-center",
                    "primary-text select-none",
                )}>
                    <span className="max-xl:hidden">{uniqueCode}</span>
                    <span className="max-md:text-sm font-semibold tracking-wide uppercase">
                        THERE ARE NO VALID ACTIONS
                    </span>
                    <ReservationStatusBadge status={status}/>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AdminReservationResetExpiryAction reservation={reservation}/>
                <AdminReservationCancelAction reservation={reservation}/>
                <AdminReservationRefundAction reservation={reservation}/>
            </div>
        </section>
    );
};