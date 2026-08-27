/**
 * @fileoverview Component for managing the refund process of a reservation.
 */

import {ReactElement, useState} from "react";
import {
    AdminReservationRefundForm
} from "@/views/admin/reservations/_feat/reservation-actions/refund/AdminReservationRefundForm.tsx";
import {
    AdminReservationRefundDialog
} from "@/views/admin/reservations/_feat/reservation-actions/refund/AdminReservationRefundDialog.tsx";
import {AdminReservation} from "@/domains/reservations";
import {AdminActionButton} from "@/views/common/_comp";

/** Props for the AdminReservationRefundAction component. */
type ActionProps = {
    reservation: AdminReservation;
};

/**
 * Orchestrates the refund process by wrapping the UI in a form and a confirmation dialog.
 */
export function AdminReservationRefundAction(
    {reservation: {_id, uniqueCode, notes, pricePaid, currency, isPaid, status}}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isDisabled = (status !== "PAID" && status !== "CANCELLED") || !isPaid;
    const subtext = status === "REFUNDED"
        ? "Already Refunded"
        : isDisabled ? "Must Be A Paid Reservation" : `${pricePaid} ${currency}`;

    return (
        <AdminReservationRefundForm
            mutConfig={{reservationID: _id}}
            presetValues={{notes: notes ?? ""}}
            successMessage="Refunded."
            errorMessage="Failed to process refund. Please try again."
            onSubmitSuccess={() => setIsOpen(false)}
        >
            <AdminReservationRefundDialog isOpen={isOpen} setIsOpen={setIsOpen} uniqueCode={uniqueCode}>
                <AdminActionButton
                    text="Refund Reservation"
                    subtext={subtext}
                    variant="warning"
                    disabled={isDisabled}
                />
            </AdminReservationRefundDialog>
        </AdminReservationRefundForm>
    );
}