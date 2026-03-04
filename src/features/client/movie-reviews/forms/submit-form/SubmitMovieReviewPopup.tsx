/**
 * @file Movie review submission dialog.
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
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

/**
 * Props for the submission dialog.
 */
type PopupProps = PresetOpenState & {
    isHidden?: boolean;
    children: ReactNode;
};

/**
 * Dialog for creating or editing a movie review.
 */
const SubmitMovieReviewPopup = (
    {children, isHidden, ...presetState}: PopupProps
) => {
    const {activeOpen, setActiveOpen} = usePresetActiveOpen(presetState);

    const {control} = useFormContext();
    const {formID, mutationState: {isPending} = {}, options: {isEditing} = {}} = useRequiredContext({
        context: MovieReviewSubmitFormViewContext,
        message: "Must be used within a provider for the form context."
    });

    if (isHidden) {
        return null;
    }

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

                    <HookFormInput label="Display Name" name="displayName" control={control}/>
                    <HookFormInput label="Summary" name="summary" control={control}/>
                    <HookFormTextArea label="Review" name="reviewText" control={control}/>
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