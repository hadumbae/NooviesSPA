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
    /** Controls the confirmation modal visibility. */
    const [isOpen, setIsOpen] = useState(false);
    const {_id, expiresAt, uniqueCode} = reservation;

    /** Formats the current expiration for display on the trigger button. */
    const currentExpiry = expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");

    /**
     * Post-success callback to close the modal and provide updated visual feedback.
     * @param res - The updated reservation object returned from the server.
     */
    const onSuccess = (res: AdminReservation) => {
        setIsOpen(false);

        const expiryDate = res.expiresAt.toFormat("HH:mm:ss dd MMM, yyyy");
        toast.success(`Expiration successfully extended. Now expires at: ${expiryDate}.`);
    }

    /**
     * Initializes the mutation with scoped success logic and standardized error handling.
     */
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
                className="w-full h-32"
            >
                <div className="flex flex-col space-y-1">
                    <span className="font-bold uppercase tracking-tight">Reset Expiry Date</span>
                    <span className="text-xs opacity-90">{currentExpiry}</span>
                </div>
            </Button>
        </AdminReservationResetExpiryDialog>
    );
};