/**
 * @fileoverview Handler for submitting customer movie review forms and managing the mutation lifecycle.
 */

import {FieldValues, UseFormReturn} from "react-hook-form";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {MovieReview} from "@/domains/movieReviews/schemas";

/** Configuration for the customer review form submission handler. */
type SubmitConfig<TValues extends FieldValues, TSubmit extends FieldValues = TValues> =
    MutationResponseConfig<MovieReview, TSubmit> & MutationFormResetConfig & {
    form: UseFormReturn<TValues, unknown, TSubmit>;
    data: TSubmit;
    submitData: (data: TSubmit) => Promise<MovieReview>;
}

/** Processes the movie review form submission, including callbacks, API calls, and error handling. */
export async function handleCustomerReviewFormSubmit<TValues extends FieldValues, TSubmit extends FieldValues = TValues>(
    {form, data, submitData, ...onSubmitConfig}: SubmitConfig<TValues, TSubmit>
) {
    try {
        handleMutationCallback({
            message: onSubmitConfig.submitMessage,
            cb: () => onSubmitConfig.onSubmit?.(data),
        });

        const review = await submitData(data);

        onSubmitConfig.resetOnSuccess && form.reset();
        handleMutationCallback({
            message: onSubmitConfig.submitMessage,
            cb: () => onSubmitConfig.onSubmitSuccess?.(review),
            messageType: "success",
        });
    } catch (error: unknown) {
        handleMutationFormError({error, form, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    }
}