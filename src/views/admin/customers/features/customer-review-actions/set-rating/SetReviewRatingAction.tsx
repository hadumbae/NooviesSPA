/**
 * @file Orchestrator component for the "Set Review Rating" administrative action.
 * @filename SetReviewRatingAction.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SetReviewRatingFormData} from "@/domains/review/features/admin-actions/forms";
import {useState} from "react";
import {
    SetReviewRatingForm
} from "@/views/admin/customers/features/customer-review-actions/set-rating/SetReviewRatingForm.tsx";
import {
    SetReviewRatingDialog
} from "@/views/admin/customers/features/customer-review-actions/set-rating/SetReviewRatingDialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Props for the SetReviewRatingAction component.
 */
type ActionProps = MutationOnSubmitParams<MovieReview> & {
    /** The internal database ID of the review whose rating is being overridden. */
    reviewID: ObjectId;
    /** Optional initial values for the rating and moderation justification. */
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * A composite component that encapsulates the state, form logic, and dialog for rating overrides.
 * ---
 */
export const SetReviewRatingAction = (
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Resets the dialog state and propagates the success event once the rating is updated.
     * @param review - The updated movie review returned by the server.
     */
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
};