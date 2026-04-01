/**
 * @file Confirmation dialog for administrative reservation cancellation.
 * @filename AdminReservationCancelDialog.tsx
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {UpdateReservationNotesFormContext} from "@/domains/reservation/features/update-reservations/contexts";
import {useFormContext} from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ReactNode} from "react";

/**
 * Properties for the {@link AdminReservationCancelDialog} component.
 */
type DialogProps = {
    /** The trigger element (e.g., Action Button) to open the modal. */
    children: ReactNode;
    /** The human-readable reservation identifier for confirmation. */
    uniqueCode: string;
    /** Controlled visibility state. */
    isOpen: boolean;
    /** State setter for controlling dialog visibility. */
    setIsOpen: (open: boolean) => void;
};

/**
 * A modal interface that captures cancellation reasons and confirms the administrative action.
 */
export const AdminReservationCancelDialog = (
    {children, isOpen, setIsOpen, uniqueCode}: DialogProps
) => {
    const {formID} = useRequiredContext({context: UpdateReservationNotesFormContext});
    const {control} = useFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="primary-text">
                        Cancel Reservation
                    </DialogTitle>
                    <DialogDescription className="secondary-text">
                        Are you sure you want to cancel Reservation <span className="font-bold">{uniqueCode}</span>?
                        This action may be irreversible.
                    </DialogDescription>
                </DialogHeader>

                {/* Captured as part of the UpdateReservationNotesFormSubmit payload */}
                <HookFormTextArea
                    label="Cancellation Reason / Admin Notes"
                    name="notes"
                    control={control}
                    placeholder="Enter reason for cancelling..."
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>

                    {/* Linked to the formKey provided by the context provider */}
                    <Button form={formID} variant="primary" type="submit">
                        Confirm Cancellation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};