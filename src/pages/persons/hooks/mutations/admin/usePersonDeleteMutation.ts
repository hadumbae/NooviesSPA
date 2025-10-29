import {toast} from "react-toastify";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";

/**
 * Custom React hook to delete a person using a mutation.
 *
 * @remarks
 * - Uses `react-query`'s `useMutation` to perform the delete operation.
 * - Handles toast notifications for success and error states.
 * - Invalidates relevant queries after a successful deletion.
 * - Executes optional callbacks provided via `params`.
 *
 * @param params - Callback handlers and optional messages for success or error.
 * @param params.onDeleteSuccess - Optional callback executed after successful deletion.
 * @param params.onDeleteError - Optional callback executed when deletion fails.
 * @param params.successMessage - Optional custom message for a successful deletion toast.
 * @param params.errorMessage - Optional custom message for a failed deletion toast.
 *
 * @returns A `useMutation` result object from `react-query` for deleting a person.
 *
 * @example
 * ```ts
 * const { mutate: deletePerson, isLoading } = usePersonDeleteMutation({
 *   onDeleteSuccess: () => console.log("Person deleted"),
 *   successMessage: "Successfully removed person!",
 * });
 *
 * deletePerson({ _id: person.id });
 * ```
 */
export default function usePersonDeleteMutation(params: OnDeleteMutationParams) {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const queryClient = useQueryClient();

    /**
     * Performs the deletion of a person by ID.
     *
     * @param _id - The ID of the person to delete.
     */
    const deletePerson = async ({_id}: {_id: ObjectId}) => {
        await handleMutationResponse({
            action: () => PersonRepository.delete({_id}),
            errorMessage: "Failed to delete person data. Please try again.",
        });
    }

    /**
     * Handles successful deletion.
     * - Shows a success toast.
     * - Invalidates the person queries in react-query cache.
     * - Calls the optional `onDeleteSuccess` callback.
     */
    const onSuccess = async () => {
        toast.success(successMessage ?? "Person deleted successfully.");
        await queryClient.invalidateQueries({queryKey: ["fetch_persons_by_query"], exact: false});
        onDeleteSuccess?.();
    }

    /**
     * Handles deletion errors.
     * - Shows an error toast.
     * - Calls `handleMutationResponseError`.
     * - Calls the optional `onDeleteError` callback.
     *
     * @param error - The error thrown during deletion.
     */
    const onError = (error: unknown) => {
        toast.error(errorMessage ?? "Failed to delete person. Please try again.");
        handleMutationResponseError({error, displayMessage: errorMessage});
        onDeleteError?.(error);
    }

    return useMutation({
        mutationKey: ['delete_single_person'],
        mutationFn: deletePerson,
        onSuccess,
        onError,
    });
}
