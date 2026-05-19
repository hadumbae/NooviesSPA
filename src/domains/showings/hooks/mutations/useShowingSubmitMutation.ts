/**
 * @file useShowingSubmitMutation.ts
 *
 * React Query mutation hook for creating or updating a `Showing`.
 *
 * Handles:
 * - Create vs. update resolution via `editID`
 * - API response validation using `ShowingDetailsSchema`
 * - Toast-based success feedback
 * - Form-level error hydration
 * - Cache invalidation for all related Showing queries
 */

import ShowingRepository from "@/domains/showings/repositories/ShowingRepository.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {ShowingQueryKeys} from "@/domains/showings/utilities/query/ShowingQueryKeys.ts";
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values/ShowingFormValues.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import {ShowingFormData} from "@/domains/showings/schema/form";

/**
 * Mutation parameters for submitting a Showing form.
 */
type SubmitParams = SubmitMutationParams<ShowingFormValues, ShowingDetails>;

/**
 * Provides a mutation for submitting Showing form data.
 *
 * @param params - Form instance, mutation options, and lifecycle callbacks.
 *
 * @returns
 * A React Query mutation result for the Showing submission flow.
 *
 * @example
 * ```ts
 * const mutation = useShowingSubmitMutation({ form, editID });
 *
 * form.handleSubmit(values => mutation.mutate(values));
 * ```
 */
export default function useShowingSubmitMutation(
    params: SubmitParams
): UseMutationResult<ShowingDetails, unknown, ShowingFormData> {
    const {
        form,
        editID,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
    } = params;

    const config = {populate: true, virtuals: true};
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes a create or update request for a Showing.
     */
    const submitShowings = async (values: ShowingFormData) => {
        const action = editID
            ? () => ShowingRepository.update({_id: editID, data: values, config})
            : () => ShowingRepository.create({data: values, config});

        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema: ShowingDetailsSchema,
            message: "Invalid data received.",
        });

        if (!success) throw error;

        return data;
    };

    /**
     * Handles successful mutation resolution.
     */
    const onSuccess = (showing: ShowingDetails) => {
        invalidateQueries(
            [
                ShowingQueryKeys.ids({_id: showing._id}),
                ShowingQueryKeys.slugs({slug: showing.slug}),
                ShowingQueryKeys.paginated(),
                ShowingQueryKeys.query(),
            ],
            {exact: false}
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.(showing);
    };

    /**
     * Handles mutation errors and form hydration.
     */
    const onError = (error: unknown) => {
        handleMutationFormError({form, error, displayMessage: errorMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: ["submit_showing_data"],
        mutationFn: submitShowings,
        onSuccess,
        onError,
    });
}
