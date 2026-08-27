/**
 * @fileoverview Component for the admin reservation cancellation action trigger.
 */

import {ReactElement, useState} from "react";
import {AdminReservation} from "@/domains/reservations";
import {
    AdminReservationCancelForm
} from "@/views/admin/reservations/_feat/reservation-actions/cancel/AdminReservationCancelForm.tsx";
import {
    AdminReservationCancelDialog
} from "@/views/admin/reservations/_feat/reservation-actions/cancel/AdminReservationCancelDialog.tsx";
import {AdminActionButton} from "@/views/common/_comp";

/** Props for the AdminReservationCancelAction component. */
type ActionProps = {
    reservation: AdminReservation;
};

/**
 * A button trigger that opens a cancellation dialog and form for a specific reservation.
 */
export function AdminReservationCancelAction(
    {reservation: {_id, notes, uniqueCode, status}}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isDisabled = status !== "RESERVED" && status !== "PAID";
    const subtext = isDisabled ? "Already Cancelled" : "(Must Be An Active Reservation)";

    return (
        <AdminReservationCancelForm mutConfig={{reservationID: _id}} presetValues={{notes: notes ?? ""}}>
            <AdminReservationCancelDialog uniqueCode={uniqueCode} isOpen={isOpen} setIsOpen={setIsOpen}>
                <AdminActionButton
                    text="Cancel Reservation"
                    subtext={subtext}
                    variant="error"
                    disabled={isDisabled}
                />
            </AdminReservationCancelDialog>
        </AdminReservationCancelForm>
    );
}
