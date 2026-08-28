/**
 * @fileoverview Form component and hook exports for toggling a movie review's public visibility with a moderation message.
 */

import {MovieReview} from "@/domains/movie-reviews/_schema/model";
import {
    createForm,
    ModerationMessageFormData,
    ModerationMessageFormSchema,
    ModerationMessageFormValues
} from "@/common/_feat";
import {useToggleReviewPublicityMutation} from "@/domains/movie-reviews/_feat/admin-actions/toggle-review-publicity";
import {MovieReviewMutationConfig} from "@/domains/movie-reviews/_types";

const {SubmitForm, useSubmitForm} = createForm<
    ModerationMessageFormValues,
    ModerationMessageFormData,
    unknown,
    MovieReview,
    MovieReviewMutationConfig
>({
    formName: "toggle-review-publicity-form",
    schema: ModerationMessageFormSchema,
    mutation: useToggleReviewPublicityMutation,
    defaultValues: {
        message: "",
    }
});

export {
    /** Form component for toggling movie review publicity. */
        SubmitForm as ToggleReviewPublicityForm,
    /** Hook for managing review publicity toggle form state and submission. */
        useSubmitForm as useToggleReviewPublicityForm,
}