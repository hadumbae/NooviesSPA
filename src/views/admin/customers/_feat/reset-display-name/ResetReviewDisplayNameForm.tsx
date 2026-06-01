/**
 * @fileoverview Form component for resetting a review author's display name to system defaults.
 */

import {
    ResetReviewDisplayNameFormData,
    useResetReviewDisplayNameForm
} from "@/domains/movieReviews/_feat/admin-actions/forms";
import {Form} from "@/common/components/ui/form.tsx";
import {useResetReviewDisplayNameMutation} from "@/domains/movieReviews/_feat/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ReactNode} from "react";
import {AdminReviewActionFormContextProvider} from "@/domains/movieReviews/_feat/admin-actions/context";

import {MovieReview} from "@/domains/movieReviews/schemas/model";

/** Props for the ResetReviewDisplayNameForm component. */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    children: ReactNode;
    reviewID: ObjectId;
    uniqueKey?: string;
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
};

/**
 * Administrative form wrapper for reverting review display names to system defaults.
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