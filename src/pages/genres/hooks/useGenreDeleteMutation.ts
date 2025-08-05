import {useMutation, useQueryClient} from "@tanstack/react-query";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";

/**
 * Parameters for the `useGenreDeleteMutation` hook.
 *
 * This type extends {@link FormMutationOnSubmitParams} but overrides the
 * `onSubmitSuccess` and `onSubmitError` callbacks to provide signatures
 * specific to delete operations.
 */
type DeleteMutationParams = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * Callback invoked when the genre deletion succeeds.
     */
    onSubmitSuccess?: () => void;

    /**
     * Callback invoked when the genre deletion fails.
     * @param error - The error object from the failed mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * A custom React hook that handles deleting a single genre entity.
 *
 * This hook integrates with `@tanstack/react-query` for mutation handling,
 * uses `GenreRepository.delete` for API interaction, and displays
 * success/error toasts via `react-toastify`.
 *
 * @param params - Configuration for mutation behavior including optional
 *                 success/error callbacks and messages.
 *
 * @returns The mutation object from `useMutation`, which includes state
 *          (e.g., `isLoading`, `isError`) and mutation methods.
 *
 * @example
 * ```tsx
 * const deleteMutation = useGenreDeleteMutation({
 *   successMessage: "Genre successfully deleted.",
 *   errorMessage: "Could not delete genre.",
 *   onSubmitSuccess: () => refreshGenres(),
 * });
 *
 * deleteMutation.mutate({ _id: "someObjectId" });
 * ```
 */
export default function useGenreDeleteMutation(params: DeleteMutationParams) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const queryClient = useQueryClient();

    const deleteGenre = async ({_id}: {_id: ObjectId}) => {
        await handleMutationResponse({
            action: () => GenreRepository.delete({_id}),
            errorMessage: "Failed to delete genre. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage && "Genre deleted.");

        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_single_genre"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_genres_by_query"], exact: false}),
        ]);

        onSubmitSuccess && onSubmitSuccess();
    }

    const onError = (error: unknown) => {
        toast.error(errorMessage ?? "Oops. Failed to delete genre. Please try again.");
        handleMutationResponseError(error);
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey: ['delete_single_genre'],
        mutationFn: deleteGenre,
        onSuccess,
        onError,
    });
}