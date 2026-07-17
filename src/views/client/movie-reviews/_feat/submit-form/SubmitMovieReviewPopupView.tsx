/**
 * @fileoverview Dialog component for submitting or editing movie reviews.
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
import {ReactElement, ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {useLockForFormUI} from "@/common/_feat/handle-form/useLockForFormUI.ts";
import {UIOpenStateProps} from "@/common/_types";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {MovieReviewSubmitFormView} from "@/views/client/movie-reviews/_feat/submit-form/MovieReviewSubmitFormView.tsx";

/** Props for the SubmitMovieReviewPopup component. */
type PopupProps = UIOpenStateProps & {
    children: ReactNode;
    isEditing?: boolean;
};

/**
 * Dialog for creating or editing a movie review.
 */
export function SubmitMovieReviewPopupView(
    {children, isOpen, setIsOpen, isEditing}: PopupProps
): ReactElement {
    const {formID, isPending, isError} = useBaseFormContext();

    const {isUILocked} = useLockForFormUI({
        isContentOpen: isOpen,
        isMutationPending: !!isPending,
        isMutationError: !!isError,
    });

    const actionButtonText = isEditing ? "Edit Review" : "Submit";
    const dialogTitle = isEditing ? "Edit Your Review" : "Write Your Review";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>Movie Reviews</DialogDescription>
                </DialogHeader>

                <MovieReviewSubmitFormView />

                <DialogFooter className="max-sm:gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>

                    <Button form={formID} type="submit" variant="primary" disabled={isUILocked}>
                        {isPending ? <AnimatedLoader/> : actionButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
