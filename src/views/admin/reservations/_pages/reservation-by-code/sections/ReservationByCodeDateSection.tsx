/**
 * @fileoverview Chronological date overview section for a reservation's lifecycle.
 */

import {ReactElement} from "react";
import {Check, Coins, Cross, Receipt, Timer} from "lucide-react";
import {PageSectionHeader} from "@/views/common/_comp";
import {ReservationActiveDateCard} from "@/views/admin/reservations/_comp";
import {AdminReservation, ReservationStatus} from "@/domains/reservations";

/** Props for the ReservationByCodeDateSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/**
 * Numeric weight assigned to statuses to determine which lifecycle stages to render.
 */
const STATUS_VALUES: Record<ReservationStatus, number> = {
    "RESERVED": 1,
    "PAID": 2,
    "EXPIRED": 2,
    "CANCELLED": 3,
    "REFUNDED": 4,
};

/** Renders a progressive list of dates associated with the reservation's history. */
export function ReservationByCodeDateSection(
    {reservation}: SectionProps
): ReactElement {
    const {
        dateReserved,
        datePaid,
        dateExpired,
        dateCancelled,
        dateRefunded,
        status,
    } = reservation;

    return (
        <section className="space-y-3">
            <PageSectionHeader text="Dates"/>

            <div className="flex justify-center">
                <div className="w-full grid grid-cols-1 gap-2">
                    <ReservationActiveDateCard
                        status="RESERVED"
                        date={dateReserved}
                        text="Reserved"
                        icon={Check}
                    />

                    {
                        STATUS_VALUES[status] >= 2 && (
                            <ReservationActiveDateCard
                                status={status === "EXPIRED" ? "EXPIRED" : "PAID"}
                                date={dateExpired ?? datePaid}
                                text={status === "EXPIRED" ? "Expired" : "Paid"}
                                icon={status === "EXPIRED" ? Timer : Receipt}
                            />
                        )
                    }

                    {
                        STATUS_VALUES[status] >= 3 && (
                            <ReservationActiveDateCard
                                status="CANCELLED"
                                date={dateCancelled}
                                text="Cancelled"
                                icon={Cross}
                            />
                        )
                    }

                    {
                        STATUS_VALUES[status] >= 4 && (
                            <ReservationActiveDateCard
                                status="REFUNDED"
                                date={dateRefunded}
                                text="Refunded"
                                icon={Coins}
                            />
                        )
                    }
                </div>
            </div>
        </section>
    );
}