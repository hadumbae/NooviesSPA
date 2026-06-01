/**
 * @fileoverview Form wrapper for administrative operations that toggle the visibility of a movie review.
 */

import {ReactElement, ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/_feat/moderation/forms";

import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {AdminReviewActionFormContextProvider, useToggleReviewPublicityMutation} from "@/domains/movieReviews/_feat";

/** Props for the ToggleReviewPublicityForm component. */
type FormProps = MutationResponseConfig<MovieReview> & {
    children: ReactNode;
    uniqueKey?: string;
    reviewID: ObjectId;
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for toggling review visibility.
 */
export function ToggleReviewPublicityForm(
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
): ReactElement {
    const formKey = `toggle-review-publicity-${uniqueKey ?? "form"}`;
    const form = useModerationMessageForm({presetValues});
    const {mutate} = useToggleReviewPublicityMutation({
        reviewID,
        form,
        onSubmit: onSubmitParams
    });

    const togglePublicity = (values: ModerationMessageFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider reviewID={reviewID} formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(togglePublicity)}
                >
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
}
