/**
 * @file Form component for resetting a review author's display name to system defaults.
 * @filename ResetReviewDisplayNameForm.tsx
 */

import {
    ResetReviewDisplayNameFormData,
    useResetReviewDisplayNameForm
} from "@/domains/review/features/admin-actions/forms";
import {Form} from "@/common/components/ui/form.tsx";
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
    /** The UI elements (inputs, buttons) to be rendered within the form context. */
    children: ReactNode;
    /** The internal database ID of the review being targeted. */
    reviewID: ObjectId;
    /** Optional unique identifier to prevent ID collisions when multiple forms exist on one page. */
    uniqueKey?: string;
    /** Initial values to populate the form fields. */
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * Administrative form wrapper for reverting review display names.
 * ---
 */
export const ResetReviewDisplayNameForm = (
    {children, reviewID, uniqueKey, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `reset-review-display-name-${uniqueKey ?? "form"}`;

    const form = useResetReviewDisplayNameForm({presetValues});

    const {mutate} = useResetReviewDisplayNameMutation({
        reviewID,
        form,
        onSubmit: onSubmitProps
    });

    const resetDisplayName = (values: ResetReviewDisplayNameFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider reviewID={reviewID} formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(resetDisplayName)}
                >
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
};