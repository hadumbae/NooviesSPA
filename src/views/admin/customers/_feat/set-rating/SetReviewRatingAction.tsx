/**
 * @fileoverview Orchestrator component for the Set Review Rating administrative action.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SetReviewRatingFormData} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {ReactElement, useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {MovieReview} from "@/domains/movieReviews/schemas";
import {SetReviewRatingDialog, SetReviewRatingForm} from "@/views/admin/customers/_feat";


/** Props for the SetReviewRatingAction component. */
type ActionProps = MutationResponseConfig<MovieReview> & {
    reviewID: ObjectId;
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * Encapsulates the state, form logic, and dialog for administrative rating overrides.
 */
export function SetReviewRatingAction(
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        onSubmitSuccess?.(review);
    };

    return (
        <SetReviewRatingForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...onSubmitProps}
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