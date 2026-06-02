/**
 * @fileoverview Form view for submitting a movie review.
 */

import {ReactElement} from "react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import StarRatingSelector from "@/common/components/forms/radio-group/StarRatingSelector.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieReviewSubmitFormView component. */
type ViewProps = {
    className?: string;
};

/**
 * Renders the input fields for a movie review submission.
 */
export function MovieReviewSubmitFormView(
    {className}: ViewProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex justify-between items-start">
                <PrimaryHeaderText>Review The Movie!</PrimaryHeaderText>
                <StarRatingSelector name="rating" control={control}/>
            </div>

            <Separator/>

            <HookFormInput label="Display Name" name="displayName" control={control}/>
            <HookFormInput label="Summary" name="summary" control={control}/>
            <HookFormTextArea label="Review" name="reviewText" control={control}/>
            <HookFormCheckbox label="Recommend Movie?" name="isRecommended" control={control}/>
        </div>
    );
}