/**
 * @file Orchestrator component for the "Reset Display Name" administrative action.
 * @filename ResetReviewDisplayNameAction.tsx
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ResetReviewDisplayNameFormData} from "@/domains/review/features/admin-actions/forms";
import {useState} from "react";
import {ResetReviewDisplayNameForm} from "@/views/admin/moviereviews/forms";
import {Button} from "@/common/components/ui/button.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {
    ResetReviewDisplayNameDialog
} from "@/views/admin/customers/features/customer-review-actions/reset-display-name/ResetReviewDisplayNameDialog.tsx";

/**
 * Props for the ResetReviewDisplayNameAction component.
 */
type ActionProps = MutationOnSubmitParams<MovieReview> & {
    /** The internal database ID of the movie review. */
    reviewID: ObjectId;
    /** Optional default values to populate the form (e.g., current display name). */
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * A composite component that bundles the form logic, dialog state, and trigger button.
 * ---
 */
export const ResetReviewDisplayNameAction = (
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Closes the dialog and propagates the success event to parent observers.
     * @param review - The updated movie review returned by the API.
     */
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
};