/**
 * @file useTheatreDeleteMutation.ts
 *
 * React Query mutation hook for deleting `Theatre` entities.
 *
 * Handles:
 * - Delete requests via {@link TheatreRepository}
 * - Toast-based user feedback
 * - Cache invalidation for theatre list queries
 * - Optional lifecycle callbacks
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";

import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {ParseError} from "@/common/errors/ParseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";

import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {TheatreQueryKeys} from "@/pages/theatres/utilities/query/TheatreQueryKeys.ts";

/**
 * Mutation hook for deleting a single theatre by ID.
 *
 * Intended for administrative or management workflows
 * where theatre entities can be permanently removed.
 *
 * @param options Delete mutation configuration
 * @returns React Query mutation result
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
     * Invalidates theatre list queries after deletion.
     */
    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes the delete request.
     */
    const deleteTheatre = async ({_id}: { _id: ObjectId }): Promise<void> => {
        await handleMutationResponse({
            action: () => TheatreRepository.delete({_id}),
            errorMessage: "Failed to delete theatre data. Please try again.",
        });
    };

    /**
     * Handles successful deletion.
     */
    const onSuccess = (): void => {
        invalidateQueries(
            [TheatreQueryKeys.paginated(), TheatreQueryKeys.query()],
            {exact: false},
        );

        toast.success(successMessage ?? "Theatre deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Handles deletion errors.
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
     * Registers the mutation.
     */
    return useMutation({
        mutationKey: ["delete_single_theatre"],
        mutationFn: deleteTheatre,
        onSuccess,
        onError,
    });
}
