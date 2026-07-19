/**
 * @fileoverview Action component for resetting the expiration (TTL) of an administrative reservation.
 */

import {ReactElement, useState} from "react";
import {Button} from "@/views/common/_comp/ui";
import {toast} from "react-toastify";
import {cn} from "@/common/_feat";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";

import {AdminReservation, useResetReservationExpiryMutation} from "@/domains/reservations";
import {
    AdminReservationResetExpiryDialog
} from "@/views/admin/reservations/_feat/reservation-actions/reset-expiry/AdminReservationResetExpiryDialog.tsx";

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
            <Button
                variant="primary"
                disabled={isDisabled}
                className={cn(
                    "w-full h-32 text-white hover:text-white",
                    "bg-blue-500 hover:bg-blue-800",
                    "dark:bg-blue-600 dark:hover:bg-blue-500",
                )}
            >
                <div className="flex flex-col space-y-1">
                    <span className="font-bold uppercase tracking-tight">Reset Expiry Date</span>
                    <span className="text-xs opacity-90">{subtext}</span>
                </div>
            </Button>
        </AdminReservationResetExpiryDialog>
    );
}