import {toast} from "react-toastify";
import PersonRepository from "@/pages/persons/repositories/PersonRepository.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import handleMutationResponseError from "@/common/utility/mutations/handleMutationResponseError.ts";

type MutationParams = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    /**
     * Optional callback invoked after a successful delete mutation.
     */
    onSubmitSuccess?: () => void;

    /**
     * Optional callback invoked if the delete mutation fails.
     * @param error - The error object or value returned from the mutation.
     */
    onSubmitError?: (error: unknown) => void;
};

/**
 * Custom React Query hook to perform a deletion mutation for a person entity.
 *
 * Wraps `PersonRepository.delete` with mutation lifecycle handlers:
 * - Displays success/error toasts.
 * - Invalidates relevant queries on success.
 * - Calls optional callbacks for success and error handling.
 *
 * @param {MutationParams} params - Parameters controlling success/error callbacks and messages.
 * @param {() => void} [params.onSubmitSuccess] - Callback fired after successful deletion.
 * @param {(error: unknown) => void} [params.onSubmitError] - Callback fired on deletion error.
 * @param {string} [params.successMessage] - Optional success toast message override.
 * @param {string} [params.errorMessage] - Optional error toast message override.
 *
 * @returns {import("@tanstack/react-query").UseMutationResult<void, unknown, {_id: ObjectId}, unknown>} React Query mutation object.
 *
 * @example
 * ```ts
 * const { mutate: deletePerson } = usePersonDeleteMutation({
 *   onSubmitSuccess: () => console.log("Deleted!"),
 *   onSubmitError: (err) => console.error(err),
 * });
 *
 * deletePerson({ _id: somePersonId });
 * ```
 */
export default function usePersonDeleteMutation(params: MutationParams) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const queryClient = useQueryClient();

    const deletePerson = async ({_id}: {_id: ObjectId}) => {
        const action = () => PersonRepository.delete({_id});
        await handleMutationResponse({
            action,
            errorMessage: "Failed to delete person data. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Person deleted successfully.");
        await queryClient.invalidateQueries({queryKey: ["fetch_persons_by_query"], exact: false});
        onSubmitSuccess && onSubmitSuccess();
    }

    const onError = (error: unknown) => {
        toast.error(errorMessage ?? "Failed to delete person. Please try again.");
        handleMutationResponseError({error, errorMessage});
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey: ['delete_single_person'],
        mutationFn: deletePerson,
        onSuccess,
        onError,
    });
}