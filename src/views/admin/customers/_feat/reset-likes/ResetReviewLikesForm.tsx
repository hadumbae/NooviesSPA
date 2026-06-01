/**
 * @fileoverview Form wrapper for administrative operations that reset movie review likes.
 */

import {ReactElement, ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/_feat/moderation/forms";
import {Form} from "@/common/components/ui/form.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {MovieReview} from "@/domains/movieReviews/schemas";
import {AdminReviewActionFormContextProvider, useResetReviewLikesMutation} from "@/domains/movieReviews/_feat";


/** Props for the ResetReviewLikesForm component. */
type FormProps = MutationResponseConfig<MovieReview> & {
    children: ReactNode;
    uniqueKey?: string;
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for resetting review like counts.
 */
export function ResetReviewLikesForm(
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
): ReactElement {
    const formKey = `reset-review-likes-${uniqueKey ?? "form"}`;
    const form = useModerationMessageForm({presetValues});
    const {mutate} = useResetReviewLikesMutation({
        reviewID,
        form,
        onSubmit: onSubmitParams
    });

    const resetLikes = (values: ModerationMessageFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider reviewID={reviewID} formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(resetLikes)}
                >
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
}