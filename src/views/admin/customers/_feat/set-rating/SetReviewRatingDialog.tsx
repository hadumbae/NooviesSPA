/**
 * @file Dialog component for the administrative "Set Review Rating" override.
 * @filename SetReviewRatingDialog.tsx
 */

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useFormContext} from "react-hook-form";
import {ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AdminReviewActionFormContext} from "@/domains/review/features/admin-actions/context";
import {cn} from "@/common/lib/utils.ts";
import StarRatingSelector from "@/common/components/forms/radio-group/StarRatingSelector.tsx";

/**
 * Props for the SetReviewRatingDialog component.
 */
type DialogProps = {
    /** The trigger element (usually an "Edit" or "Override" button). */
    children?: ReactNode;
    /** Controlled visibility state. */
    isOpen: boolean;
    /** Callback to toggle visibility. */
    setIsOpen: (open: boolean) => void;
    /** Optional styling classes for the input container. */
    className?: string;
};

/**
 * Provides an interface for administrators to manually adjust a review's star rating.
 * ---
 */
export const SetReviewRatingDialog = (
    {children, isOpen, setIsOpen, className}: DialogProps
) => {
    /** * Retrieve the parent form's identity from context. */
    const {formID} = useRequiredContext({context: AdminReviewActionFormContext});

    /** * Connect to the RHF state established in the parent Form wrapper. */
    const {control} = useFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Component trigger */}
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-2">
                <DialogHeader>
                    <DialogTitle>Set Review's Rating</DialogTitle>
                    <DialogDescription>
                        Modify the review's rating. This action cannot be reversed.
                    </DialogDescription>
                </DialogHeader>

                <div className={cn("space-y-2", className)}>
                    {/* Visual rating selector for the numerical 'rating' field */}
                    <StarRatingSelector
                        name="rating"
                        control={control}
                    />

                    {/* Requirement for audit trail documentation */}
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

                    {/* Submits the form identified by the context's formID */}
                    <Button
                        form={formID}
                        variant="primary"
                        type="submit"
                    >
                        Set
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};