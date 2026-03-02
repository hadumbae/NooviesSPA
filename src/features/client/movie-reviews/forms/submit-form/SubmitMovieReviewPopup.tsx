/**
 * @file Popup dialog for creating or editing a MovieReview submission.
 * SubmitMovieReviewPopup.tsx
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    MovieReviewSubmitFormViewContext
} from "@/pages/review/context/submit-form-view-context/MovieReviewSubmitFormViewContext.ts";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import {ReactNode} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {useFormContext} from "react-hook-form";
import StarRatingSelector from "@/common/components/forms/radio-group/StarRatingSelector.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import usePresetActiveOpen from "@/common/hooks/usePresetActiveOpen.ts";

/**
 * Props for SubmitMovieReviewPopup.
 */
type PopupProps = PresetOpenState & {
    /** Trigger element used to open the popup dialog. */
    children: ReactNode;
};

/**
 * Modal dialog for submitting or editing a movie review.
 *
 * Consumes MovieReviewSubmitFormViewContext to:
 * - Resolve current mutation state (e.g. loading).
 * - Determine editing mode.
 * - Bind submit action to parent form via formID.
 *
 * Renders rating, review text, and recommendation inputs.
 */
const SubmitMovieReviewPopup = (
    {children, ...presetState}: PopupProps
) => {
    const {activeOpen, setActiveOpen} = usePresetActiveOpen(presetState);

    const {control} = useFormContext();
    const {formID, mutationState: {isPending} = {}, options: {isEditing} = {}} = useRequiredContext({
        context: MovieReviewSubmitFormViewContext,
        message: "Must be used within a provider for the form context."
    });

    return (
        <Dialog open={activeOpen} onOpenChange={setActiveOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Your Review" : "Write Your Review"}</DialogTitle>
                    <DialogDescription>Movie Reviews</DialogDescription>
                </DialogHeader>

                <section className="space-y-4">
                    <div className="flex justify-between items-start">
                        <PrimaryHeaderText>Review The Movie!</PrimaryHeaderText>
                        <StarRatingSelector name="rating" control={control}/>
                    </div>

                    <Separator/>

                    <HookFormTextArea placeholder="Review" name="reviewText" control={control}/>
                    <HookFormCheckbox label="Recommend Movie?" name="isRecommended" control={control}/>
                </section>

                <DialogFooter className="max-sm:gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>

                    <Button form={formID} type="submit" variant="primary" disabled={isPending}>
                        {isPending ? <AnimatedLoader/> : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitMovieReviewPopup;
