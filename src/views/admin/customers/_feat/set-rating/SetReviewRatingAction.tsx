/**
 * @fileoverview Orchestrator component for the Set Review Rating administrative action.
 */

import {ObjectId} from "@/common/_schemas";
import {SetReviewRatingFormData} from "@/domains/movie-reviews/_feat/admin-actions/forms";
import {ReactElement, useState} from "react";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {MovieReview} from "@/domains/movie-reviews/_schema";
import {SetReviewRatingDialog, SetReviewRatingForm} from "@/views/admin/customers/_feat";


/** Props for the SetReviewRatingAction component. */
type ActionProps = {
    reviewID: ObjectId;
    presetValues?: Partial<SetReviewRatingFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, SetReviewRatingFormData> & MutationFormResetConfig;
};

/**
 * Encapsulates the state, form logic, and dialog for administrative rating overrides.
 */
export function SetReviewRatingAction(
    {reviewID, presetValues, submitConfig}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <SetReviewRatingForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...submitConfig}
            onSubmitSuccess={closeOnSuccess}
        >
            <SetReviewRatingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="outline" size="tile">
                    Set Review Rating
                </Button>
            </SetReviewRatingDialog>
        </SetReviewRatingForm>
    );
}