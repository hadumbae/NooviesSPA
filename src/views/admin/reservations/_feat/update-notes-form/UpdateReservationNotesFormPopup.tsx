/**
 * @fileoverview Interactive dialog popup for editing administrative reservation notes.
 */

import {ReactElement, ReactNode} from "react";
import {HookFormTextArea} from "@/views/common/_feat";
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
    const {formID} = useBaseFormContext();

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

                <HookFormTextArea label="Admin Notes" name="notes"/>

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