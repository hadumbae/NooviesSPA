/**
 * @fileoverview Dialog component for the administrative action to reset review likes.
 *
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
import {ReactElement, ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AdminReviewActionFormContext} from "@/domains/movieReviews/_feat";
import {useFormContext} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

/** Props for the ResetReviewLikesDialog component. */
type DialogProps = {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

/**
 * Confirmation interface for resetting a review's like count to zero.
 */
export function ResetReviewLikesDialog(
    {children, isOpen, setIsOpen}: DialogProps
): ReactElement {
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
}