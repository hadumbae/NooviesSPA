import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParseError } from "@/common/errors/ParseError.ts";
import { toast } from "react-toastify";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";

/**
 * Custom React hook to perform deletion of a theatre.
 *
 * Wraps `@tanstack/react-query`'s `useMutation` to handle API deletion
 * of a theatre entity via {@link TheatreRepository.delete}.
 * Automatically handles:
 * - Success and error feedback via `react-toastify` toasts
 * - Invalidates related theatre queries after deletion
 * - Optional success/error callback execution
 *
 * @param options - Configuration options for the delete mutation
 * @param options.successMessage - Custom success message to show on deletion
 * @param options.onDeleteSuccess - Optional callback executed after a successful deletion
 * @param options.errorMessage - Custom error message to show on failure
 * @param options.onDeleteError - Optional callback executed when deletion fails, receives the error object
 *
 * @returns A `useMutation` object from `@tanstack/react-query` pre-configured
 *          for theatre deletion. Includes `mutate`, `mutateAsync`, `isLoading`, `isError`, etc.
 *
 * @example
 * ```ts
 * import useTheatreDeleteMutation from "@/pages/theatres/hooks/useTheatreDeleteMutation.ts";
 *
 * const { mutate: deleteTheatre, isLoading } = useTheatreDeleteMutation({
 *   successMessage: "Theatre deleted successfully!",
 *   onDeleteSuccess: () => console.log("Refresh theatre list"),
 *   errorMessage: "Failed to delete theatre.",
 * });
 *
 * deleteTheatre({ _id: "66b9d1b8c35f2a0012cd90f0" });
 * ```
 */
export default function useTheatreDeleteMutation(options: OnDeleteMutationParams) {
    const { successMessage, onDeleteSuccess, errorMessage, onDeleteError } = options;

    const mutationKey = ["delete_single_theatre"];
    const queryClient = useQueryClient();

    /**
     * Mutation function that deletes a theatre by ID via {@link TheatreRepository.delete}.
     *
     * @param param0 - Object containing the theatre ID
     * @param param0._id - The unique ID of the theatre to delete
     */
    const mutationFn = async ({ _id }: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => TheatreRepository.delete({ _id }),
            errorMessage: "Failed to delete theatre data. Please try again.",
        });
    };

    /**
     * Called after a successful deletion.
     * - Shows a success toast
     * - Executes optional success callback
     */
    const onSuccess = async () => {
        toast.success(successMessage ?? "Theatre deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Called if deletion fails.
     * - Shows error toast
     * - Executes optional error callback
     *
     * @param error - The error object from the failed mutation
     */
    const onError = (error: Error | ParseError) => {
        const { message = "Oops. Something went wrong. Please try again." } = error;
        toast.error(errorMessage ?? message);
        onDeleteError?.(error);
    };

    /**
     * Called when the mutation is settled (either success or failure).
     * - Invalidates the theatre list query to keep UI in sync
     */
    const onSettled = async () => {
        await queryClient.invalidateQueries({ queryKey: ["fetch_theatres_by_query"], exact: false });
    };

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
        onSettled,
    });
}
