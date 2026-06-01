/**
 * @fileoverview Orchestrator component for the Reset Display Name administrative action.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ResetReviewDisplayNameFormData} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {ReactElement, useState} from "react";
import {Button} from "@/common/components/ui/button.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {ResetReviewDisplayNameDialog, ResetReviewDisplayNameForm} from "@/views/admin/customers/_feat";

/** Props for the ResetReviewDisplayNameAction component. */
type ActionProps = MutationOnSubmitParams<MovieReview> & {
    reviewID: ObjectId;
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * Composite component that bundles the form logic, dialog state, and trigger button for resetting a review display name.
 */
export function ResetReviewDisplayNameAction(
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        onSubmitSuccess?.(review);
    };

    return (
        <ResetReviewDisplayNameForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...onSubmitProps}
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