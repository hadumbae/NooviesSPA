/**
 * @fileoverview Form component and hook exports for resetting likes on a movie review with a moderation message.
 */

import {MovieReview} from "@/domains/movie-reviews/_schema";
import {
    createForm,
    ModerationMessageFormData,
    ModerationMessageFormSchema,
    ModerationMessageFormValues
} from "@/common/_feat";
import {useResetReviewLikesMutation} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-likes";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

const {SubmitForm, useSubmitForm} = createForm<
    ModerationMessageFormValues,
    ModerationMessageFormData,
    unknown,
    MovieReview,
    MovieReviewMutationConfig
>({
    formName: "reset-review-likes-form",
    schema: ModerationMessageFormSchema,
    mutation: useResetReviewLikesMutation,
    defaultValues: {
        message: "",
    }
});

export {
    /** Form component for resetting movie review likes. */
        SubmitForm as ResetReviewLikesForm,
    /** Hook for managing review likes reset form state and submission. */
        useSubmitForm as useResetReviewLikesForm,
}