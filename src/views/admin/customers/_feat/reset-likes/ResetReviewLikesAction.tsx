/**
 * @file Orchestrator component for the "Reset Review Likes" administrative action.
 * @filename ResetReviewLikesAction.tsx
 */

import {useState} from "react";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ModerationMessageFormData} from "@/common/features/moderation/forms";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ResetReviewLikesForm
} from "@/views/admin/customers/_feat/reset-likes/ResetReviewLikesForm.tsx";
import {
    ResetReviewLikesDialog
} from "@/views/admin/customers/_feat/reset-likes/ResetReviewLikesDialog.tsx";
import {Button} from "@/common/components/ui/button.tsx";

/**
 * Props for the ResetReviewLikesAction component.
 */
type ActionProps = MutationOnSubmitParams<MovieReview> & {
    /** The internal database ID of the review targeting for a like reset. */
    reviewID: ObjectId;
    /** Optional initial values for the moderation message. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * A composite component that encapsulates the state, form logic, and dialog for resetting review likes.
 * ---
 */
export const ResetReviewLikesAction = (
    {reviewID, presetValues, onSubmitSuccess, ...onSubmitProps}: ActionProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        onSubmitSuccess?.(review);
    };

    return (
        <ResetReviewLikesForm
            reviewID={reviewID}
            presetValues={presetValues}
            {...onSubmitProps}
            onSubmitSuccess={closeOnSuccess}
        >
            <ResetReviewLikesDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="outline" size="tile">Reset Review Likes</Button>
            </ResetReviewLikesDialog>
        </ResetReviewLikesForm>
    );
};