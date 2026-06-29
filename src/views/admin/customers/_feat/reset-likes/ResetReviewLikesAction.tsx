/**
 * @fileoverview Orchestrator component for the Reset Review Likes administrative action.
 */

import {ReactElement, useState} from "react";
import {ModerationMessageFormData} from "@/common/_feat/moderation/forms";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ResetReviewLikesForm} from "@/views/admin/customers/_feat/reset-likes/ResetReviewLikesForm.tsx";
import {ResetReviewLikesDialog} from "@/views/admin/customers/_feat/reset-likes/ResetReviewLikesDialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";

/** Props for the ResetReviewLikesAction component. */
type ActionProps = {
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, ModerationMessageFormData> & MutationFormResetConfig;
};

/** Composite component that encapsulates the state, form logic, and dialog for resetting review likes. */
export function ResetReviewLikesAction(
    {reviewID, presetValues, submitConfig}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <ResetReviewLikesForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...submitConfig}
            onSubmitSuccess={closeOnSuccess}
        >
            <ResetReviewLikesDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="outline" size="tile">Reset Review Likes</Button>
            </ResetReviewLikesDialog>
        </ResetReviewLikesForm>
    );
}