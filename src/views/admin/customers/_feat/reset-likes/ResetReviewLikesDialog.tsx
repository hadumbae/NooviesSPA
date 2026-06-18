/**
 * @fileoverview Dialog component for the administrative action to reset review likes.
 *
 */

import {ReactElement, ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

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
    const {formID} = useBaseFormContext();
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