/**
 * @fileoverview Form view for submitting a movie review.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {Separator} from "@/common/components/ui";
import {HookFormCheckbox, HookFormInput, HookFormTextArea, StarRatingSelector} from "@/views/common/_feat";

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
                <h3 className="subsection-title">Review The Movie!</h3>
                <StarRatingSelector name="rating" control={control}/>
            </div>

            <Separator/>

            <HookFormInput label="Display Name" name="displayName" control={control}/>
            <HookFormInput label="Summary" name="summary" control={control}/>
            <HookFormTextArea label="Review" name="reviewText"/>
            <HookFormCheckbox label="Recommend Movie?" name="isRecommended"/>
        </div>
    );
}