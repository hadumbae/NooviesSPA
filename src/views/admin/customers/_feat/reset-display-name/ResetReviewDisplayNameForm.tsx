/**
 * @fileoverview Form component and hook exports for resetting a movie review display name.
 */

import {createForm} from "@/common/_feat";
import {MovieReview} from "@/domains/movie-reviews";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";
import {
    ResetReviewDisplayNameFormData,
    ResetReviewDisplayNameFormSchema,
    ResetReviewDisplayNameFormValues,
    useResetReviewDisplayNameMutation
} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-display-name";

const {SubmitForm, useSubmitForm} = createForm<
    ResetReviewDisplayNameFormValues,
    ResetReviewDisplayNameFormData,
    unknown,
    MovieReview,
    MovieReviewMutationConfig
>({
    formName: "reset-review-display-name-form",
    schema: ResetReviewDisplayNameFormSchema,
    mutation: useResetReviewDisplayNameMutation,
    defaultValues: {
        displayName: "",
        message: "",
    }
});

export {
    /** Form component for resetting a review author's display name with a moderation message. */
        SubmitForm as ResetReviewDisplayNameForm,
    /** Hook for managing the display name reset form state and submission. */
        useSubmitForm as useResetReviewDisplayNameForm,
}