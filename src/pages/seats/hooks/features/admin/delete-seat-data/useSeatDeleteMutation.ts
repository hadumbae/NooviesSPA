/**
 * @file useSeatDeleteMutation.ts
 *
 * React Query mutation hook for deleting a single `Seat` entity.
 *
 * Responsibilities:
 * - Deletes a seat via {@link SeatRepository}
 * - Displays success or error toast notifications
 * - Executes optional lifecycle callbacks
 * - Invalidates seat list queries to keep UI state in sync
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import handleMutationResponse from "@/common/handlers/mutation/handleMutationResponse.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {SeatQueryKeys} from "@/pages/seats/utilities/query/SeatQueryKeys.ts";

/**
 * Deletes a seat by ID.
 *
 * Wraps a React Query mutation to handle deletion, notifications,
 * callbacks, and cache invalidation.
 *
 * @param params - Optional messages and lifecycle callbacks
 * @returns React Query mutation result for seat deletion
 *
 * @example
 * ```ts
 * const mutation = useSeatDeleteMutation({
 *   successMessage: "Seat deleted.",
 * });
 *
 * mutation.mutate({ _id: "64f123abc1234567890abcdef" });
 * ```
 */
export default function useSeatDeleteMutation(
    params: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes the seat deletion request.
     *
     * @param _id - Seat identifier
     */
    const deleteSeat = async ({_id}: { _id: ObjectId }) => {
        await handleMutationResponse({
            action: () => SeatRepository.delete({_id}),
            errorMessage: "Failed to delete seat. Please try again.",
        });
    };

    const onSuccess = () => {
        invalidateQueries(
            [SeatQueryKeys.query(), SeatQueryKeys.paginated()],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onDeleteSuccess?.();
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to delete seat. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey: ["delete_single_seat"],
        mutationFn: deleteSeat,
        onSuccess,
        onError,
    });
}
