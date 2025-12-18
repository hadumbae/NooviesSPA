/**
 * @file useShowingSubmitMutation.ts
 *
 * @summary
 * React Query mutation hook for creating or updating a Showing.
 *
 * @description
 * Encapsulates the full submission lifecycle for Showing form data, including:
 * - Creating or updating a showing via {@link ShowingRepository}
 * - Runtime schema validation of API responses using {@link ShowingDetailsSchema}
 * - Success and error feedback handling
 * - Automatic cache invalidation for affected showing queries
 *
 * This hook is designed to be used alongside a controlled form (e.g. React Hook Form)
 * and integrates cleanly with standardized mutation submit parameters.
 */

import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ShowingForm} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {SubmitMutationParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";

/**
 * Combined parameters for the showing submission mutation.
 *
 * @remarks
 * Extends {@link SubmitMutationParams} with Showing-specific
 * form values and response typing.
 */
type SubmitParams = SubmitMutationParams<ShowingFormValues, ShowingDetails>;

/**
 * Provides a mutation for submitting Showing form data.
 *
 * @remarks
 * - Automatically switches between create and update operations based on `editID`
 * - Validates server responses against {@link ShowingDetailsSchema}
 * - Displays toast feedback on success
 * - Maps API validation errors back onto the form
 * - Invalidates all relevant Showing-related queries after completion
 *
 * @param params - Mutation configuration, form instance, and lifecycle callbacks.
 *
 * @returns
 * A React Query {@link UseMutationResult} for the Showing submission operation.
 *
 * @example
 * ```ts
 * const mutation = useShowingSubmitMutation({
 *   form,
 *   editID,
 *   successMessage: "Showing saved successfully",
 * });
 *
 * form.handleSubmit(values => mutation.mutate(values));
 * ```
 */
export default function useShowingSubmitMutation(
    params: SubmitParams
): UseMutationResult<ShowingDetails, unknown, ShowingForm> {
    const {
        form,
        editID,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
    } = params;

    const mutationKey = ["submit_showing_data"];
    const queryClient = useQueryClient();
    const queryOptions = {populate: true, virtuals: true};

    /**
     * Executes the create or update request for a Showing.
     *
     * @param values - Validated form values to submit.
     *
     * @throws
     * Throws if the repository request fails or if schema validation does not pass.
     */
    const submitShowings = async (values: ShowingForm) => {
        const action = editID
            ? () => ShowingRepository.update({_id: editID, data: values, ...queryOptions})
            : () => ShowingRepository.create({data: values, ...queryOptions});

        const {result} = await action();

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: ShowingDetailsSchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;

        return parsedData;
    };

    /**
     * Handles successful mutation completion.
     *
     * @param showing - The validated Showing returned from the API.
     */
    const onSuccess = (showing: ShowingDetails) => {
        const message = editID ? "Showing updated." : "Showing submitted.";
        toast.success(successMessage ?? message);
        onSubmitSuccess?.(showing);
    };

    /**
     * Handles mutation errors.
     *
     * @param error - The error thrown during submission.
     *
     * @remarks
     * Attempts to map backend validation errors back to the form
     * and displays a fallback error message when necessary.
     */
    const onError = (error: unknown) => {
        handleMutationFormError({
            form,
            error,
            displayMessage: errorMessage ?? "An error occurred. Please try again.",
        });

        onSubmitError?.(error);
    };

    /**
     * Invalidates all relevant Showing-related queries once the mutation settles.
     *
     * @remarks
     * Ensures cached lists and detail views remain consistent
     * with the server state after create or update operations.
     */
    const onSettled = async () => {
        const invalidateKeys = [
            "fetch_showings_by_query",
            "fetch_single_showing",
        ];

        await Promise.all(
            invalidateKeys.map(key =>
                queryClient.invalidateQueries({queryKey: key, exact: false})
            )
        );
    };

    return useMutation({
        mutationKey,
        mutationFn: submitShowings,
        onSuccess,
        onError,
        onSettled,
    });
}
