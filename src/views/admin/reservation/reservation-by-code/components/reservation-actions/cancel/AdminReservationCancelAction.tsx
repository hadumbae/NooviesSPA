/**
 * @file Action controller for initiating the administrative reservation cancellation workflow.
 * @filename AdminReservationCancelAction.tsx
 */

import {
    AdminReservationCancelForm
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions/cancel/AdminReservationCancelForm.tsx";
import {AdminReservation} from "@/domains/reservation/schema/model";
import {
    AdminReservationCancelDialog
} from "@/views/admin/reservation/reservation-by-code/components/reservation-actions/cancel/AdminReservationCancelDialog.tsx";
import {useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Properties for the {@link AdminReservationCancelAction} component.
 */
type ActionProps = {
    /** The active reservation record targeted for cancellation. */
    reservation: AdminReservation;
};

/**
 * Orchestrates the cancellation process by nesting UI and logic providers.
 */
export const AdminReservationCancelAction = (
    {reservation}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {_id, notes, uniqueCode, status} = reservation;

    const isDisabled = status !== "RESERVED" && status !== "PAID";
    const subtext = isDisabled ? "Already Cancelled" : "(Must Be An Active Reservation)";

    return (
        <AdminReservationCancelForm
            reservationID={_id}
            presetValues={{notes: notes ?? ""}}
        >
            <AdminReservationCancelDialog
                uniqueCode={uniqueCode}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Button
                    variant="ghost"
                    disabled={isDisabled}
                    className={cn(
                        "w-full h-32 text-white hover:text-white",
                        "bg-red-500 hover:bg-red-800",
                        "dark:bg-red-600 dark:hover:bg-red-500",
                    )}
                >
                    <div className="flex flex-col space-y-1">
                        <span className="font-bold uppercase tracking-tight">Cancel Reservation</span>
                        <span className="text-xs opacity-90">{subtext}</span>
                    </div>
                </Button>
            </AdminReservationCancelDialog>
        </AdminReservationCancelForm>
    );
};