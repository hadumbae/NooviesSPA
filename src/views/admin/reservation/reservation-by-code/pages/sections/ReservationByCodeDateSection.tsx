/**
 * @file Chronological date overview section for a reservation's lifecycle.
 * @filename ReservationByCodeDateSection.tsx
 */

import {AdminReservation, ReservationStatus} from "@/domains/reservation/schema/model";
import {
    ReservationActiveDateCard
} from "@/views/admin/reservation/components/active-date-card/ReservationActiveDateCard.tsx";
import {Check, Coins, Cross, Receipt, Timer} from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link ReservationByCodeDateSection} component.
 */
type SectionProps = {
    /** The reservation data object containing status and relevant timestamps. */
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

/**
 * Renders a progressive list of dates associated with the reservation's history.
 */
export const ReservationByCodeDateSection = (
    {reservation}: SectionProps
) => {
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
            <SectionHeader className={SectionHeaderCSS}>
                Dates
            </SectionHeader>

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
                                status={status}
                                date={dateExpired ?? datePaid}
                                text={status === "EXPIRED" ? "Expired" : "Paid"}
                                icon={status === "EXPIRED" ? Timer : Receipt}
                            />
                        )
                    }

                    {
                        STATUS_VALUES[status] >= 3 && (
                            <ReservationActiveDateCard
                                status={status}
                                date={dateCancelled}
                                text="Cancelled"
                                icon={Cross}
                            />
                        )
                    }

                    {
                        STATUS_VALUES[status] >= 4 && (
                            <ReservationActiveDateCard
                                status={status}
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
};