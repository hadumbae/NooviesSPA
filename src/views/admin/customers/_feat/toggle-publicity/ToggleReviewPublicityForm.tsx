/**
 * @file Form wrapper for administrative operations that toggle the visibility of a movie review.
 * @filename ToggleReviewPublicityForm.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useToggleReviewPublicityMutation} from "@/domains/review/features/admin-actions/mutations";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";
import {Form} from "@/common/components/ui/form.tsx";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/features/moderation/forms";

/**
 * Props for the ToggleReviewPublicityForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** The nested UI components, typically including the dialog trigger and audit fields. */
    children: ReactNode;
    /** Unique identifier suffix to ensure DOM ID uniqueness in views containing multiple actions. */
    uniqueKey?: string;
    /** The target review's database ID. */
    reviewID: ObjectId;
    /** Optional initial state for the moderation message field. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the data flow and submission logic for toggling review visibility.
 * ---
 */
export const ToggleReviewPublicityForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
) => {
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
};