/**
 * @file Interactive dialog popup for editing administrative reservation notes.
 * @filename UpdateReservationNotesFormPopup.tsx
 */

import {ReactNode} from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter, DialogClose
} from "@/common/components/ui/dialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {useFormContext} from "react-hook-form";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {UpdateReservationNotesFormContext} from "@/domains/reservation/features/update-reservations/contexts";

/**
 * Properties for the {@link UpdateReservationNotesFormPopup} component.
 */
type PopupProps = {
    /** Controlled state for the dialog visibility. */
    isOpen: boolean;
    /** Callback to update the visibility state. */
    setIsOpen: (open: boolean) => void
    /** The trigger element (e.g., an Edit button) rendered as the dialog initiator. */
    children?: ReactNode;
    /** Custom title for the dialog header. Defaults to "Update Notes". */
    title?: string
    /** Custom description text. Defaults to "Update Admin Notes For Reservation". */
    description?: string
    /** Custom text for the primary action button. Defaults to "Update". */
    buttonText?: string
};

/**
 * A modal presentation layer that integrates with the reservation notes form context.
 */
export const UpdateReservationNotesFormPopup = (
    {children, isOpen, setIsOpen, title, description, buttonText}: PopupProps
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
};