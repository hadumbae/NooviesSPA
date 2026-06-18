/**
 * @fileoverview Orchestrator component for the Toggle Review Publicity administrative action.
 *
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {useState} from "react";
import {
    ToggleReviewPublicityDialog
} from "@/views/admin/customers/_feat/toggle-publicity/ToggleReviewPublicityDialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {
    ToggleReviewPublicityForm
} from "@/views/admin/customers/_feat/toggle-publicity/ToggleReviewPublicityForm.tsx";

import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the ToggleReviewPublicityAction component. */
type ActionProps = {
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, ModerationMessageFormData> & MutationFormResetConfig;
};

/**
 * Encapsulates the state, form logic, and dialog for toggling review visibility.
 */
export const ToggleReviewPublicityAction = (
    {reviewID, presetValues, submitConfig}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <ToggleReviewPublicityForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...submitConfig}
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