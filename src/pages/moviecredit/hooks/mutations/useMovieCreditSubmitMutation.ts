import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import { toast } from "react-toastify";
import { MovieCredit } from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import { MovieCreditForm, MovieCreditFormValues } from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import { UseFormReturn } from "react-hook-form";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import { MovieCreditSchema } from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Parameters for submitting a movie credit through a form mutation.
 *
 * Combines generic form submission parameters with editing state and the form instance.
 *
 * @template TData - The type of the data returned on a successful submit.
 * @see {@link MutationOnSubmitParams}
 * @see {@link MutationEditByIDParams}
 * @see {@link UseFormReturn}
 */
type SubmitParams = MutationOnSubmitParams<MovieCredit> &
    MutationEditByIDParams & {
    /** React Hook Form instance used for validation and error handling */
    form: UseFormReturn<MovieCreditFormValues>;
};

/**
 * React Query hook to submit a single movie credit, supporting both creation and editing.
 *
 * @template TData - The expected type of the movie credit returned by the mutation.
 *
 * @param params - Object containing form data, editing state, callbacks, and messages.
 * @param params.form - {@link UseFormReturn} instance managing the form.
 * @param params.onSubmitSuccess - Optional callback fired on successful submission.
 *   @see {@link MutationOnSubmitParams#onSubmitSuccess}
 * @param params.onSubmitError - Optional callback fired on submission error.
 *   @see {@link MutationOnSubmitParams#onSubmitError}
 * @param params.successMessage - Optional success message to display.
 *   @see {@link MutationOnSubmitParams#successMessage}
 * @param params.errorMessage - Optional error message to display.
 *   @see {@link MutationOnSubmitParams#errorMessage}
 * @param params.validationSchema - Optional Zod schema to validate returned data.
 *   @see {@link MutationOnSubmitParams#validationSchema}
 * @param params.isEditing - Indicates whether this is an edit operation.
 *   @see {@link MutationEditByIDParams#isEditing}
 * @param params._id - Required when editing; identifies the movie credit to update.
 *   @see {@link MutationEditByIDParams#_id}
 *
 * @returns A {@link UseMutationResult} for managing mutation state, data, and errors.
 *
 * @remarks
 * - Handles creation and updating of movie credit data via {@link MovieCreditRepository.create} and {@link MovieCreditRepository.update}.
 * - Validates returned data using {@link validateData} against {@link MovieCreditSchema} or a custom schema.
 * - Displays success messages using `react-toastify`.
 * - Handles form errors using {@link handleMutationFormError} for consistent UX.
 * - Invalidates movie credit queries on settlement to refresh cached data.
 *
 * @example
 * ```ts
 * const mutation = useMovieCreditSubmitMutation({
 *   form,
 *   isEditing: false,
 *   successMessage: "Movie credit created successfully!",
 *   onSubmitSuccess: (credit) => console.log("Created:", credit)
 * });
 *
 * mutation.mutate(form.getValues());
 * ```
 */
export default function useMovieCreditSubmitMutation(
    params: SubmitParams
): UseMutationResult<MovieCredit, unknown, MovieCreditForm> {
    const queryClient = useQueryClient();
    const {
        form,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
        validationSchema,
        isEditing,
        _id,
    } = params;

    const mutationKey = ["submit_single_movie_credit"];

    const submitMovieCreditData = async (values: MovieCreditForm) => {
        console.log("Movie Credit Submit Values: ", values);

        const action =
            isEditing === true
                ? () => MovieCreditRepository.update({ _id, data: values })
                : () => MovieCreditRepository.create({ data: values });

        const result = await handleMutationResponse({
            action,
            errorMessage: "Failed to submit data. Please try again.",
        });

        const { data, success, error } = validateData({
            data: result,
            schema: validationSchema ?? MovieCreditSchema,
            message: "Invalid data returned. Please try again.",
        });

        if (!success) throw error;
        return data;
    };

    const onSuccess = async (credit: MovieCredit) => {
        const actionDisplay = isEditing ? "Updated" : "Created";
        toast.success(successMessage || `${actionDisplay} movie credit successfully.`);
        onSubmitSuccess?.(credit);
    };

    const onError = (error: unknown) => {
        const actionDisplay = isEditing ? "update" : "create";
        const fallbackMessage =
            errorMessage ?? `Failed to ${actionDisplay} movie credit. Please try again.`;
        handleMutationFormError({ form, error, displayMessage: fallbackMessage });
        onSubmitError?.(error);
    };

    const onSettled = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["fetch_movie_credits_by_query"],
            exact: false,
        });
    };

    return useMutation({
        mutationKey,
        mutationFn: submitMovieCreditData,
        onSuccess,
        onError,
        onSettled,
    });
}
