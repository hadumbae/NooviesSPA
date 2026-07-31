/**
 * @fileoverview List view component for rendering timestamp audit cards based on reservation lifetime status changes.
 */

import {ReactElement} from "react";
import {ReservationActiveDateCard} from "@/views/admin/reservations";
import {Check, Coins, Cross, Receipt, Timer} from "lucide-react";
import {AdminReservation, Reservation, ReservationStatus} from "@/domains/reservations";

/** Props for the CustomerReservationDateList component. */
type ListProps = {
    reservation: Reservation | AdminReservation;
};

const STATUS_VALUES: Record<ReservationStatus, number> = {
    "RESERVED": 1,
    "PAID": 2,
    "EXPIRED": 2,
    "CANCELLED": 3,
    "REFUNDED": 4,
};

/**
 * Displays a progressive stack of historical timestamp cards indicating when reservation status state changes occurred.
 */
export function CustomerReservationDateList(
    {reservation}: ListProps
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
    );
}