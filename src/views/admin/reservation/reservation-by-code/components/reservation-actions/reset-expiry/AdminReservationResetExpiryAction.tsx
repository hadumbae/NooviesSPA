/**
 * @file Action component for resetting the expiration (TTL) of an administrative reservation.
 * @filename AdminReservationResetExpiryAction.tsx
 */

import {
    AdminReservationResetExpiryDialog
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions/reset-expiry/AdminReservationResetExpiryDialog.tsx";
import {useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {useResetReservationExpiryMutation} from "@/domains/reservation/features/update-reservations/hooks";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {toast} from "react-toastify";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the {@link AdminReservationResetExpiryAction} component.
 */
type ActionProps = {
    /** The reservation record containing the current ID and expiration metadata. */
    reservation: AdminReservation;
};

/**
 * A controller component that manages the "Reset Expiry" interaction flow.
 */
export const AdminReservationResetExpiryAction = (
    {reservation}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState(false);
    const {_id, expiresAt, uniqueCode, status} = reservation;

    const isDisabled = status !== "RESERVED";
    const subtext = isDisabled ? "Must Be A RESERVED Reservation" : expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");

    const onSuccess = (res: AdminReservation) => {
        setIsOpen(false);

        const expiryDate = res.expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");
        toast.success(`Expiration successfully extended. Now expires at: ${expiryDate}.`);
    }

    const mutation = useResetReservationExpiryMutation({
        reservationID: _id,
        onSubmit: {
            successMessage: "Expiry Date Reset!",
            onSubmitSuccess: onSuccess,
        },
    });

    return (
        <AdminReservationResetExpiryDialog
            mutation={mutation}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
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
};