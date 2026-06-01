/**
 * @fileoverview Form wrapper for administrative operations that manually set or correct a movie review's rating.
 */

import {ReactElement, ReactNode} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";

import {MovieReview} from "@/domains/movieReviews/schemas/model";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    AdminReviewActionFormContextProvider,
    SetReviewRatingFormData,
    useSetReviewRatingForm,
    useSetReviewRatingMutation
} from "@/domains/movieReviews/_feat";

/** Props for the SetReviewRatingForm component. */
type FormProps = MutationResponseConfig<MovieReview> & {
    children: ReactNode;
    uniqueKey?: string;
    reviewID: ObjectId;
    presetValues?: Partial<SetReviewRatingFormData>;
};

/**
 * Orchestrates the data flow and submission logic for administrative rating overrides.
 */
export function SetReviewRatingForm(
    {children, uniqueKey, reviewID, presetValues, ...onSubmitParams}: FormProps
): ReactElement {
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
}