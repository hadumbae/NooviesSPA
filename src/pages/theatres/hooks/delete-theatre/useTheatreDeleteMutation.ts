import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";

import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {ParseError} from "@/common/errors/ParseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";

import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {TheatreListQueryKeys} from "@/pages/theatres/constants/TheatreQueryKeys.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/**
 * React Query mutation hook for deleting a theatre.
 *
 * Encapsulates the full delete workflow:
 * - Executes the delete request via {@link TheatreRepository}
 * - Displays user feedback via toast notifications
 * - Invalidates theatre list queries after deletion
 * - Executes optional success and error callbacks
 *
 * Intended for admin or management views where theatres
 * can be removed permanently.
 *
 * @param options - Delete mutation configuration.
 * @returns A {@link UseMutationResult} configured for theatre deletion.
 *
 * @example
 * ```ts
 * const { mutate: deleteTheatre } = useTheatreDeleteMutation({
 *   successMessage: "Theatre deleted successfully!",
 * });
 *
 * deleteTheatre({ _id: "66b9d1b8c35f2a0012cd90f0" });
 * ```
 */
export default function useTheatreDeleteMutation(
    options: OnDeleteMutationParams
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {
        successMessage,
        onDeleteSuccess,
        errorMessage,
        onDeleteError,
    } = options;

    /**
     * Theatre list queries to invalidate after deletion.
     */
    const keys = TheatreListQueryKeys.map(key => [key]);
    const invalidateQueries = useInvalidateQueryKeys({keys, exact: false});

    /**
     * Deletes a theatre by ID.
     *
     * @param params - Deletion parameters.
     * @param params._id - Unique identifier of the theatre.
     */
    const deleteTheatre = async ({_id}: { _id: ObjectId }): Promise<void> => {
        await handleMutationResponse({
            action: () => TheatreRepository.delete({_id}),
            errorMessage: "Failed to delete theatre data. Please try again.",
        });
    };

    /**
     * Handles successful deletion.
     *
     * - Invalidates theatre list queries
     * - Displays a success notification
     * - Executes optional success callback
     */
    const onSuccess = async (): Promise<void> => {
        await invalidateQueries();

        toast.success(successMessage ?? "Theatre deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Handles deletion errors.
     *
     * - Displays an error notification
     * - Executes optional error callback
     *
     * @param error - Error thrown during deletion.
     */
    const onError = (error: Error | ParseError): void => {
        toast.error(
            errorMessage ??
            error.message ??
            "Oops. Something went wrong. Please try again."
        );

        onDeleteError?.(error);
    };

    /**
     * Registers the theatre deletion mutation.
     */
    return useMutation({
        mutationKey: ["delete_single_theatre"],
        mutationFn: deleteTheatre,
        onSuccess,
        onError,
    });
}
