/**
 * @fileoverview Layout section containing administrative action triggers for a reservation.
 */

import {PageSectionHeader} from "@/views/common/_comp/page";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    AdminReservationCancelAction,
    AdminReservationRefundAction,
    AdminReservationResetExpiryAction
} from "@/views/admin/reservations/_feat";
import {
    ReservationStatusBadge
} from "@/views/client/reservations/_comp/reservation-badges/ReservationStatusBadge.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the ReservationByCodeActionsSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/** A dedicated interface section for high-level reservation management tasks. */
export function ReservationByCodeActionsSection(
    {reservation}: SectionProps
): ReactElement {
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
}