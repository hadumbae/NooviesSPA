/**
 * @fileoverview Interactive dialog popup for editing administrative reservation notes.
 */

import {ReactElement, ReactNode} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "src/common/components/ui/dialog.tsx";
import {Button} from "src/common/components/ui/button.tsx";
import HookFormTextArea from "src/common/components/forms/HookFormTextArea.tsx";
import {useFormContext} from "react-hook-form";
import useRequiredContext from "src/common/hooks/context/useRequiredContext.ts";
import {UpdateReservationNotesFormContext} from "src/domains/reservation/_feat/update-reservations/contexts";

/** Props for the UpdateReservationNotesFormPopup component. */
type PopupProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void
    children?: ReactNode;
    title?: string
    description?: string
    buttonText?: string
};

/**
 * A modal dialog for updating reservation notes.
 */
export function UpdateReservationNotesFormPopup(
    {children, isOpen, setIsOpen, title, description, buttonText}: PopupProps
): ReactElement {
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
                        {title ?? "Update Notes"}
                    </DialogTitle>
                    <DialogDescription className="secondary-text">
                        {description ?? "Update Admin Notes For Reservation"}
                    </DialogDescription>
                </DialogHeader>

                <HookFormTextArea
                    label="Admin Notes"
                    name="notes"
                    control={control}
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        {buttonText ?? "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}