/**
 * @fileoverview Presentation layer for the multi-step ticket reservation flow.
 *
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactElement, useState} from "react";
import {ReservationType} from "@/domains/reservation/schema";
import {
    ReservationCountFieldset,
    ReservationSeatFieldset,
} from "@/views/client/reservations/_feat/reserve-ticket-form/fieldsets";

/** Props for the ReservationFormView component. */
type FormViewProps = {
    reservationType: ReservationType;
    className?: string;
};

/**
 * Stateful view component that manages user progression through the booking steps.
 */
export function ReservationFormView(
    {reservationType, className}: FormViewProps
): ReactElement {
    const [reserveSeats, setReserveSeats] = useState<boolean>(reservationType === "RESERVED_SEATS");

    const proceedToCount = () => setReserveSeats(false);
    const backToSeats = () => setReserveSeats(true);

    return (
        <div className={cn("space-y-4", className)}>
            {
                reserveSeats ? (
                    <ReservationSeatFieldset proceedToCount={proceedToCount}/>
                ) : (
                    <ReservationCountFieldset backToSeats={backToSeats} reservationType={reservationType}/>
                )
            }
        </div>
    );
}