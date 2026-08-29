/**
 * @fileoverview Form component and hook exports for submitting a user movie review.
 */

import {createForm} from "@/common/_feat";
import {
    MovieReview,
    MovieReviewForm,
    MovieReviewFormSchema,
    MovieReviewFormValues,
    useSubmitUserMovieReviewMutation
} from "@/domains/movie-reviews";

const {SubmitForm, useSubmitForm} = createForm<
    MovieReviewFormValues,
    MovieReviewForm,
    MovieReview,
    MovieReview
>({
    schema: MovieReviewFormSchema,
    mutation: useSubmitUserMovieReviewMutation,
    formName: "movie-review-submit-form",
    defaultValues: {
        movie: "",
        displayName: "",
        summary: "",
        reviewText: "",
        isRecommended: false,
        rating: "",
    }
});

export {
    /** Form component for submitting a user movie review. */
        SubmitForm as MovieReviewSubmitForm,
    /** Hook for managing movie review form state and submission. */
        useSubmitForm as useMovieReviewSubmitForm,
}