import {UseFormReturn} from "react-hook-form";
import {ShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ShowingForm, ShowingFormValues} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {toast} from "react-toastify";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Combined parameters for the showing submission mutation.
 *
 * Extends form mutation configuration with editing and submission behavior.
 */
type SubmitMutationParams = MutationOnSubmitParams<Showing> &
    MutationEditByIDParams & {
    /** React Hook Form instance for managing showing form state. */
    form: UseFormReturn<ShowingFormValues>;
};

/**
 * Custom React Query mutation hook for creating or updating a showing record.
 *
 * @remarks
 * This hook abstracts form submission logic for the `Showing` entity.
 * It performs schema validation, handles success/error feedback,
 * and invalidates relevant cached queries upon completion.
 *
 * @param params - Configuration for mutation behavior and form handling.
 * @returns A React Query `UseMutationResult` that represents the mutation state and helpers.
 *
 * @example
 * ```tsx
 * const form = useForm<ShowingSubmit>({...});
 *
 * const mutation = useShowingSubmitMutation({
 *   form,
 *   isEditing: !!id,
 *   _id: id,
 *   successMessage: "Showing saved!",
 *   onSubmitSuccess: data => console.log("Submitted:", data),
 * });
 *
 * form.handleSubmit(values => mutation.mutate(values));
 * ```
 */
export default function useShowingSubmitMutation(
    params: SubmitMutationParams
): UseMutationResult<Showing, unknown, ShowingForm> {
    const {
        form,
        isEditing,
        _id,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage,
    } = params;

    const mutationKey = ['submit_showing_data'];
    const queryClient = useQueryClient();

    /**
     * Executes the create or update API request for showing data.
     * Validates response data using `ShowingSchema` before returning.
     *
     * @throws Error if schema validation fails or repository call errors.
     */
    const submitShowings = async (values: ShowingForm) => {
        const action = isEditing
            ? () => ShowingRepository.update({_id, data: values})
            : () => ShowingRepository.create({data: values});

        const {result} = await action();

        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: ShowingSchema,
            message: "Invalid data received. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    };

    /**
     * Handles successful submission.
     * Displays a toast and triggers optional external callback.
     */
    const onSuccess = (showing: Showing) => {
        toast.success(successMessage ?? "Showing data submitted.");
        onSubmitSuccess?.(showing);
    };

    /**
     * Handles submission errors.
     * Maps server validation errors back to form fields and triggers optional callback.
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
     * Invalidates related showing queries on mutation settlement.
     * Ensures UI data stays consistent with server state.
     */
    const onSettled = async () => {
        const invalidateKeys = [
            "fetch_showings_by_query",
            "fetch_single_showing",
        ];

        await Promise.all(
            invalidateKeys.map(k =>
                queryClient.invalidateQueries({queryKey: k, exact: false})
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
