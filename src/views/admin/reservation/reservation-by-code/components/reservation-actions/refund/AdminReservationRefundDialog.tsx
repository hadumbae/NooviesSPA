/**
 * @file Confirmation dialog for the administrative refund process.
 * @filename AdminReservationRefundDialog.tsx
 */

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {UpdateReservationNotesFormContext} from "@/domains/reservation/features/update-reservations/contexts";
import {ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import {ReservationUniqueCode} from "@/domains/reservation/schema/model";

/**
 * Properties for the {@link AdminReservationRefundDialog} component.
 */
type DialogProps = {
    /** The element used to trigger the dialog opening. */
    children: ReactNode;
    /** Controlled visibility state. */
    isOpen: boolean;
    /** State setter for controlling dialog visibility. */
    setIsOpen: (open: boolean) => void;
    /** The human-readable reservation code for confirmation display. */
    uniqueCode: ReservationUniqueCode;
};

/**
 * A modal interface that captures refund reasons and confirms the financial action.
 */
export const AdminReservationRefundDialog = (
    {children, uniqueCode, isOpen, setIsOpen}: DialogProps
) => {
    const {control} = useFormContext();
    const {formID} = useRequiredContext({context: UpdateReservationNotesFormContext});

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="primary-text">
                        Refund Reservation
                    </DialogTitle>
                    <DialogDescription className="secondary-text">
                        Are you sure you want to refund Reservation <span className="font-bold">{uniqueCode}</span>?
                    </DialogDescription>
                </DialogHeader>

                <HookFormTextArea
                    label="Refund Reason / Admin Notes"
                    name="notes"
                    control={control}
                    placeholder="Enter reason for refund..."
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        Confirm Refund
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};