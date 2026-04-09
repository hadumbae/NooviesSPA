/**
 * @file Orchestrator component for the "Toggle Review Publicity" administrative action.
 * @filename ToggleReviewPublicityAction.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ModerationMessageFormData} from "@/common/features/moderation/forms";
import {useState} from "react";
import {
    ToggleReviewPublicityDialog
} from "@/views/admin/customers/features/customer-review-actions/toggle-publicity/ToggleReviewPublicityDialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {
    ToggleReviewPublicityForm
} from "@/views/admin/customers/features/customer-review-actions/toggle-publicity/ToggleReviewPublicityForm.tsx";

/**
 * Props for the ToggleReviewPublicityAction component.
 */
type ActionProps = MutationOnSubmitParams<MovieReview> & {
    /** The internal database ID of the review to toggle. */
    reviewID: ObjectId;
    /** Optional initial values for the moderation message. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * A composite component that encapsulates the state, form logic, and dialog for toggling review visibility.
 * ---
 */
export const ToggleReviewPublicityAction = (
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Closes the dialog and executes the success callback upon a confirmed API update.
     * @param review - The updated movie review returned by the server.
     */
    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        onSubmitSuccess?.(review);
    };

    return (
        <ToggleReviewPublicityForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...onSubmitProps}
            onSubmitSuccess={closeOnSuccess}
        >
            <ToggleReviewPublicityDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="outline" size="tile">
                    Toggle Review Publicity
                </Button>
            </ToggleReviewPublicityDialog>
        </ToggleReviewPublicityForm>
    );
};