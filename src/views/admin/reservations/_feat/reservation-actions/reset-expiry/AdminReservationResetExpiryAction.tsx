/**
 * @fileoverview Action component for resetting the expiration (TTL) of an administrative reservation.
 */

import {ReactElement, useState} from "react";
import {toast} from "react-toastify";
import {handleSubmitResponseError} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";

import {AdminReservation, useResetReservationExpiryMutation} from "@/domains/reservations";
import {
    AdminReservationResetExpiryDialog
} from "@/views/admin/reservations/_feat/reservation-actions/reset-expiry/AdminReservationResetExpiryDialog.tsx";
import {AdminActionButton} from "@/views/common/_comp";

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

    const {mutateAsync, isPending} = useResetReservationExpiryMutation({reservationID: _id});

    const submitReset = async () => {
        try {
            const reservation = await mutateAsync();
            setIsOpen(false);

            const expiryDate = reservation.expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");
            toast.success(`Expiration successfully extended. Now expires at: ${expiryDate}.`);
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: "Failed reset expiry."})
        }
    }

    return (
        <AdminReservationResetExpiryDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submit={submitReset}
            isSubmitting={isPending}
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
    );
}