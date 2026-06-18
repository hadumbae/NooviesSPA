/**
 * @fileoverview Orchestrator component for the Reset Display Name administrative action.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ResetReviewDisplayNameFormData} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {ReactElement, useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {ResetReviewDisplayNameDialog, ResetReviewDisplayNameForm} from "@/views/admin/customers/_feat";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the ResetReviewDisplayNameAction component. */
type ActionProps = {
    reviewID: ObjectId;
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, ResetReviewDisplayNameFormData> & MutationFormResetConfig;
};

/**
 * Composite component that bundles the form logic, dialog state, and trigger button for resetting a review display name.
 */
export function ResetReviewDisplayNameAction(
    {reviewID, presetValues, submitConfig}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <ResetReviewDisplayNameForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...submitConfig}
            onSubmitSuccess={closeOnSuccess}
        >
            <ResetReviewDisplayNameDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Button variant="outline" size="tile">
                    Reset Display Name
                </Button>
            </ResetReviewDisplayNameDialog>
        </ResetReviewDisplayNameForm>
    );
}