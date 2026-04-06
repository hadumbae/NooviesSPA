/**
 * @file Container component for the "Reset Display Name" moderation form.
 * @filename ResetReviewDisplayNameForm.tsx
 */

import {Form} from "@/common/components/ui/form.tsx";
import {
    ResetReviewDisplayNameFormData,
    useResetReviewDisplayNameForm
} from "@/domains/review/features/admin-actions/forms";
import {useResetReviewDisplayNameMutation} from "@/domains/review/features/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";

/**
 * Props for the ResetReviewDisplayNameForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** Nested form fields and UI elements. */
    children: ReactNode;
    /** The ID of the review being updated. */
    reviewID: ObjectId;
    /** Optional key to distinguish multiple forms on the same page. */
    uniqueKey?: string;
    /** Initial values for the form fields. */
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * Orchestrates the state, validation, and mutation for resetting a reviewer's name.
 * ---
 */
export const ResetReviewDisplayNameForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `reset-review-display-name-${uniqueKey ?? "form"}`;

    const form = useResetReviewDisplayNameForm({presetValues});

    const {mutate} = useResetReviewDisplayNameMutation({
        form,
        reviewID,
        onSubmit: onSubmitProps
    });

    const onSubmit = (values: ResetReviewDisplayNameFormData) => {
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