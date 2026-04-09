/**
 * @file Dialog component for the administrative "Toggle Review Publicity" action.
 * @filename ToggleReviewPublicityDialog.tsx
 */

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/common/components/ui/dialog.tsx";
import {ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AdminReviewActionFormContext} from "@/domains/review/features/admin-actions/context";
import {useFormContext} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

/**
 * Props for the ToggleReviewPublicityDialog component.
 */
type DialogProps = {
    /** The trigger element (e.g., a "Hide" or "Show" button). */
    children?: ReactNode;
    /** Controlled visibility state of the dialog. */
    isOpen: boolean;
    /** Callback to update the visibility state. */
    setIsOpen: (open: boolean) => void;
};

/**
 * Provides an administrative interface for toggling a movie review's public visibility.
 * ---
 */
export const ToggleReviewPublicityDialog = (
    {children, isOpen, setIsOpen}: DialogProps
) => {
    const {formID} = useRequiredContext({context: AdminReviewActionFormContext});
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
};