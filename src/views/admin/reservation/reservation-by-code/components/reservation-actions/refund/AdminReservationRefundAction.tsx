/**
 * @file Action controller for initiating the reservation refund workflow.
 * @filename AdminReservationRefundAction.tsx
 */

import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    AdminReservationRefundForm
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions/refund/AdminReservationRefundForm.tsx";
import {
    AdminReservationRefundDialog
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions/refund/AdminReservationRefundDialog.tsx";
import {useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Properties for the {@link AdminReservationRefundAction} component.
 */
type ActionProps = {
    /** The reservation record to be processed for a refund. */
    reservation: AdminReservation;
};

/**
 * Orchestrates the refund process by wrapping the UI in a logical form and a confirmation dialog.
 */
export const AdminReservationRefundAction = (
    {reservation}: ActionProps
) => {
    const {_id, uniqueCode, notes, pricePaid, currency} = reservation;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AdminReservationRefundForm
            reservationID={_id}
            presetValues={{notes: notes ?? ""}}
            errorMessage="Failed to process refund. Please try again."
        >
            <AdminReservationRefundDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                uniqueCode={uniqueCode}
            >
                <Button
                    variant="primary"
                    className="w-full h-32"
                >
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold uppercase tracking-tight">Refund Reservation</span>
                        <span className="text-xs opacity-90">
                            {pricePaid} {currency}
                        </span>
                    </div>
                </Button>
            </AdminReservationRefundDialog>
        </AdminReservationRefundForm>
    );
};