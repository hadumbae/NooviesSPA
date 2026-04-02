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
import {cn} from "@/common/lib/utils.ts";

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
    const {_id, uniqueCode, notes, pricePaid, currency, isPaid, status} = reservation;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isDisabled = (status !== "PAID" && status !== "CANCELLED") || !isPaid;
    const subtext = status === "REFUNDED"
        ? "Already Refunded"
        : isDisabled ? "Must Be A Paid Reservation" : `${pricePaid} ${currency}`;

    return (
        <AdminReservationRefundForm
            reservationID={_id}
            presetValues={{notes: notes ?? ""}}
            successMessage="Refunded."
            errorMessage="Failed to process refund. Please try again."
            onSubmitSuccess={() => setIsOpen(false)}
        >
            <AdminReservationRefundDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                uniqueCode={uniqueCode}
            >
                <Button
                    variant="ghost"
                    disabled={isDisabled}
                    className={cn(
                        "w-full h-32 text-white hover:text-white",
                        "bg-yellow-500 hover:bg-yellow-800",
                        "dark:bg-yellow-700 dark:hover:bg-yellow-500",
                    )}
                >
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold uppercase tracking-tight">Refund Reservation</span>
                        <span className="text-xs opacity-90">{subtext}</span>
                    </div>
                </Button>
            </AdminReservationRefundDialog>
        </AdminReservationRefundForm>
    );
};