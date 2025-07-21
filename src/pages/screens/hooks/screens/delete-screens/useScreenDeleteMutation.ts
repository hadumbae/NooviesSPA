import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";

/**
 * React hook that returns a mutation for deleting a single screen by its `_id`.
 *
 * This hook integrates with React Query (`useMutation`) and wraps the delete operation
 * provided by `ScreenRepository.delete`, handles API responses, shows success/error
 * toasts, and invalidates the relevant screen query cache on success.
 *
 * ### Usage:
 * ```tsx
 * const deleteMutation = useScreenDeleteMutation();
 * deleteMutation.mutate({ _id: 'abc123' });
 * ```
 *
 * @param params - Optional configuration object:
 *  - `onSubmitSuccess`: Callback called after a successful delete.
 *  - `onSubmitError`: Callback called if an error occurs.
 *  - `successMessage`: Custom success toast message (default: `"Screen deleted."`).
 *  - `errorMessage`: Custom error toast message (default: error.message or fallback string).
 *
 * @returns A `useMutation` result object from React Query,
 * which includes `.mutate`, `.mutateAsync`, `.isLoading`, etc.
 *
 * @see {@link ScreenRepository.delete}
 * @see {@link handleAPIResponse}
 */
export default function useScreenDeleteMutation(params: FormMutationOnSubmitParams = {}) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const mutationKey = ["delete_single_screen"];
    const queryClient = useQueryClient();

    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleAPIResponse({
            action: () => ScreenRepository.delete({_id}),
            errorMessage: "Failed to delete screen data. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Screen deleted.");
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});
        onSubmitSuccess && onSubmitSuccess();
    };

    const onError = (error: Error) => {
        toast.error(errorMessage ?? error.message ?? "Something went wrong. Please try again.");
        onSubmitError && onSubmitError(error);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}