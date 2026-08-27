/**
 * @fileoverview Action component for resetting the expiration (TTL) of an administrative reservation.
 */

import {ReactElement, useState} from "react";

import {AdminReservation} from "@/domains/reservations";
import {
    AdminReservationResetExpiryDialog
} from "@/views/admin/reservations/_feat/reservation-actions/reset-expiry/AdminReservationResetExpiryDialog.tsx";
import {AdminActionButton} from "@/views/common/_comp";
import {AdminReservationResetExpiryForm} from "@/views/admin/reservations";

/** Props for the AdminReservationResetExpiryAction component. */
type ActionProps = {
    reservation: AdminReservation;
};

/** A controller component that manages the "Reset Expiry" interaction flow. */
export function AdminReservationResetExpiryAction(
    {reservation: {_id, expiresAt, uniqueCode, status}}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    const isDisabled = status !== "RESERVED";
    const subtext = isDisabled ? "Must Be A RESERVED Reservation" : expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");

    return (
        <AdminReservationResetExpiryForm
            mutConfig={{reservationID: _id}}
            onSubmitSuccess={() => setIsOpen(false)}
            successMessage="Expiry Reset."
            errorMessage="Failed to reset expiry. Please try again."
        >
            <AdminReservationResetExpiryDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                expiresAt={expiresAt}
                uniqueCode={uniqueCode}
            >
                <AdminActionButton
                    text="Reset Expiry Date"
                    subtext={subtext}
                    variant="info"
                    disabled={isDisabled}
                />
            </AdminReservationResetExpiryDialog>
        </AdminReservationResetExpiryForm>
    );
}