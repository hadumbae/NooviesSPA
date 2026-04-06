/**
 * @file Container component for the "Set Review Rating" moderation form.
 * @filename SetReviewRatingForm.tsx
 */

import {Form} from "@/common/components/ui/form.tsx";
import {SetReviewRatingFormData, useSetReviewRatingForm} from "@/domains/review/features/admin-actions/forms";
import {useSetReviewRatingMutation} from "@/domains/review/features/admin-actions/mutations";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";

/**
 * Props for the SetReviewRatingForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** Nested children containing the rating input and audit message field. */
    children: ReactNode;
    /** The ID of the review whose rating is being overridden. */
    reviewID: ObjectId;
    /** Optional identifier to isolate form instances in complex layouts. */
    uniqueKey?: string;
    /** Initial values for the rating and moderation message. */
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * Orchestrates administrative star-rating overrides for movie reviews.
 * ---
 */
export const SetReviewRatingForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitProps}: FormProps
) => {
    const formKey = `set-review-rating-${uniqueKey ?? "form"}`;

    const form = useSetReviewRatingForm({presetValues});

    const {mutate} = useSetReviewRatingMutation({
        form,
        reviewID,
        onSubmit: onSubmitProps
    });

    const onSubmit = (values: SetReviewRatingFormData) => {
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