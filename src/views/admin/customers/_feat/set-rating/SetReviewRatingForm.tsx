/**
 * @fileoverview Form component and hook exports for setting a movie review rating with an optional moderation message.
 */

import {createForm} from "@/common/_feat";
import {MovieReview} from "@/domains/movie-reviews";
import {
    SetReviewRatingFormData,
    SetReviewRatingFormSchema,
    SetReviewRatingFormValues,
    useSetReviewRatingMutation
} from "@/domains/movie-reviews/_feat/admin-actions/set-review-rating";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

const {SubmitForm, useSubmitForm} = createForm<
    SetReviewRatingFormValues,
    SetReviewRatingFormData,
    unknown,
    MovieReview,
    MovieReviewMutationConfig
>({
    formName: "set-review-rating-form",
    schema: SetReviewRatingFormSchema,
    mutation: useSetReviewRatingMutation,
    defaultValues: {
        rating: 0,
        message: ""
    }
});

export {
    /** Form component for setting a movie review rating. */
        SubmitForm as SetReviewRatingForm,
    /** Hook for managing review rating form state and submission. */
        useSubmitForm as useSetReviewRatingForm,
}