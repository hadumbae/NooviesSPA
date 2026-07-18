/**
 * @fileoverview Component for the admin reservation cancellation action trigger.
 */

import {ReactElement, useState} from "react";
import {cn} from "@/common/_feat";
import {Button} from "@/common/components/ui";

import {AdminReservation} from "@/domains/reservations";
import {
    AdminReservationCancelForm
} from "@/views/admin/reservations/_feat/reservation-actions/cancel/AdminReservationCancelForm.tsx";
import {
    AdminReservationCancelDialog
} from "@/views/admin/reservations/_feat/reservation-actions/cancel/AdminReservationCancelDialog.tsx";

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
        <AdminReservationCancelForm reservationID={_id} presetValues={{notes: notes ?? ""}}>
            <AdminReservationCancelDialog uniqueCode={uniqueCode} isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="ghost" disabled={isDisabled} className={cn(
                    "w-full h-32 text-white hover:text-white",
                    "bg-red-500 hover:bg-red-800",
                    "dark:bg-red-600 dark:hover:bg-red-500",
                )}>
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold uppercase tracking-tight">Cancel Reservation</span>
                        <span className="text-xs opacity-90">{subtext}</span>
                    </div>
                </Button>
            </AdminReservationCancelDialog>
        </AdminReservationCancelForm>
    );
}
