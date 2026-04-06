/**
 * @file Container component for the "Toggle Review Publicity" moderation form.
 * @filename ToggleReviewPublicityForm.tsx
 */

import {Form} from "@/common/components/ui/form.tsx";
import {useToggleReviewPublicityMutation} from "@/domains/review/features/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";
import {ModerationMessageFormData, useModerationMessageForm} from "@/common/features/moderation/forms";

/**
 * Props for the ToggleReviewPublicityForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** Nested UI components (e.g., justification text area, status indicators). */
    children: ReactNode;
    /** The ID of the review whose visibility is being toggled. */
    reviewID: ObjectId;
    /** Optional identifier to distinguish the form instance in the DOM. */
    uniqueKey?: string;
    /** Initial values for the moderation justification. */
    presetValues?: Partial<ModerationMessageFormData>;
};

/**
 * Orchestrates the administrative action of toggling a review between public and private.
 * ---
 */
export const ToggleReviewPublicityForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `toggle-review-publicity-${uniqueKey ?? "form"}`;

    const form = useModerationMessageForm({presetValues});

    const {mutate} = useToggleReviewPublicityMutation({
        form,
        reviewID,
        onSubmit: onSubmitProps
    });

    const onSubmit = (values: ModerationMessageFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider formID={formKey} reviewID={reviewID}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
};