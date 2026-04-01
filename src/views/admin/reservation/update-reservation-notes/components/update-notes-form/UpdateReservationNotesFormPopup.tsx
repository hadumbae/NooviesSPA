// UpdateReservationFormPopup.tsx

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

type PopupProps = {
    children?: ReactNode;
    title?: string
    description?: string
    buttonText?: string
};

export const UpdateReservationNotesFormPopup = (
    {children, title, description, buttonText}: PopupProps
) => {
    return (
        <Dialog>
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

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button variant="primary" type="submit">{buttonText ?? "Update"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};