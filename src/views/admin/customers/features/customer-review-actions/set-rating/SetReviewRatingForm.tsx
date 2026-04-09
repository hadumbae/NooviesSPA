/**
 * @file Form wrapper for administrative operations that manually set or correct a movie review's rating.
 * @filename SetReviewRatingForm.tsx
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {MovieReview} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useSetReviewRatingMutation} from "@/domains/review/features/admin-actions/mutations";
import {AdminReviewActionFormContextProvider} from "@/domains/review/features/admin-actions/context";
import {Form} from "@/common/components/ui/form.tsx";
import {SetReviewRatingFormData, useSetReviewRatingForm} from "@/domains/review/features/admin-actions/forms";

/**
 * Props for the SetReviewRatingForm component.
 */
type FormProps = MutationOnSubmitParams<MovieReview> & {
    /** The nested UI components, typically rating inputs, moderation fields, and triggers. */
    children: ReactNode;
    /** Unique identifier suffix to ensure DOM ID uniqueness when multiple actions are present. */
    uniqueKey?: string;
    /** The internal database ID of the review to be modified. */
    reviewID: ObjectId;
    /** Optional initial state for the rating and moderation message fields. */
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * Orchestrates the data flow and submission logic for administrative rating overrides.
 * ---
 */
export const SetReviewRatingForm = (
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
) => {
    const formKey = `set-review-rating-${uniqueKey ?? "form"}`;
    const form = useSetReviewRatingForm({presetValues});
    const {mutate} = useSetReviewRatingMutation({
        reviewID,
        form,
        onSubmit: onSubmitParams
    });

    const setRating = (values: SetReviewRatingFormData) => {
        mutate(values);
    };

    return (
        <AdminReviewActionFormContextProvider reviewID={reviewID} formID={formKey}>
            <Form {...form}>
                <form
                    id={formKey}
                    onSubmit={form.handleSubmit(setRating)}
                >
                    {children}
                </form>
            </Form>
        </AdminReviewActionFormContextProvider>
    );
};