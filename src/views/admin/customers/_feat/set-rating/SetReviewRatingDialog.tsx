/**
 * @fileoverview Dialog component for the administrative "Set Review Rating" override.
 */

import {ReactElement, ReactNode} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {HookFormInput, StarRatingSelector} from "@/views/common/_feat";
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
} from "@/views/common/_comp/ui";

/** Props for the SetReviewRatingDialog component. */
export type DialogProps = {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    className?: string;
};

/**
 * Interface for administrators to manually adjust a review's star rating.
 */
export function SetReviewRatingDialog(
    {children, isOpen, setIsOpen, className}: DialogProps
): ReactElement {
    const {control} = useFormContext();
    const {formID} = useBaseFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-2">
                <DialogHeader>
                    <DialogTitle>Set Review's Rating</DialogTitle>
                    <DialogDescription>Modify the review's rating. This action cannot be reversed.</DialogDescription>
                </DialogHeader>

                <div className={cn("space-y-2", className)}>
                    <StarRatingSelector name="rating" control={control}/>

                    <HookFormInput
                        type="text"
                        label="Moderation Message"
                        name="message"
                        control={control}
                        placeholder="Reason for rating override..."
                    />
                </div>

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button form={formID} variant="primary" type="submit">
                        Set
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}