/**
 * @fileoverview Dialog component for the administrative Toggle Review Publicity action.
 */

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/views/common/_comp/ui";
import {ReactElement, ReactNode} from "react";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {useFormContext} from "react-hook-form";
import {HookFormInput} from "@/views/common/_feat";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the ToggleReviewPublicityDialog component. */
type DialogProps = {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

/**
 * Administrative interface for toggling a movie review's public visibility.
 */
export function ToggleReviewPublicityDialog(
    {children, isOpen, setIsOpen}: DialogProps
): ReactElement {
    const {formID} = useBaseFormContext();
    const {control} = useFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-2">
                <DialogHeader>
                    <DialogTitle>Toggle Review Publicity</DialogTitle>
                    <DialogDescription>
                        Toggle the publicity of the review. This action can be
                        reversed by another toggle in the future.
                    </DialogDescription>
                </DialogHeader>

                <HookFormInput
                    type="text"
                    label="Moderation Message"
                    name="message"
                    control={control}
                    placeholder="Reason for the toggle..."
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        form={formID}
                        variant="primary"
                        type="submit"
                    >
                        Toggle
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}