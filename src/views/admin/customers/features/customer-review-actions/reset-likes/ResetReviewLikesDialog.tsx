/**
 * @file Dialog component for the administrative "Reset Review Likes" action.
 * @filename ResetReviewLikesDialog.tsx
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
 * Props for the ResetReviewLikesDialog component.
 */
type DialogProps = {
    /** The trigger element used to initiate the reset workflow. */
    children?: ReactNode;
    /** Controlled visibility state of the dialog. */
    isOpen: boolean;
    /** Function to update the visibility state. */
    setIsOpen: (open: boolean) => void;
};

/**
 * Provides a confirmation interface for resetting a review's like count to zero.
 * ---
 */
export const ResetReviewLikesDialog = (
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
                    <DialogTitle>Reset Review's Likes</DialogTitle>
                    <DialogDescription>
                        Reset the likes of a specified review to zero. This action is not reversible.
                    </DialogDescription>
                </DialogHeader>

                <HookFormInput
                    type="text"
                    label="Moderation Message"
                    name="message"
                    control={control}
                    placeholder="Reason for a reset..."
                />

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        Reset
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};