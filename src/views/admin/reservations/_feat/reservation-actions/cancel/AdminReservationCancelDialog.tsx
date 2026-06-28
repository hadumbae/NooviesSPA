/**
 * @fileoverview Confirmation dialog for administrative reservation cancellation.
 */

import {ReactElement, ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui";

/** Props for the AdminReservationCancelDialog component. */
type DialogProps = {
    children: ReactNode;
    uniqueCode: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

/**
 * Modal interface that captures cancellation reasons and confirms the administrative action.
 */
export function AdminReservationCancelDialog(
    {children, isOpen, setIsOpen, uniqueCode}: DialogProps
): ReactElement {
    const {formID} = useBaseFormContext();
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

                    <Button form={formID} variant="primary" type="submit">
                        Confirm Cancellation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}