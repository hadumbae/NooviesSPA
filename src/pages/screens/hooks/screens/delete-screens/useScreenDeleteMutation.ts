/**
 * @file useScreenDeleteMutation.ts
 *
 * React Query mutation hook for deleting a single screen.
 * Handles backend deletion, user feedback, optional lifecycle callbacks,
 * and query invalidation to keep UI state in sync.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {ScreenQueryKeys} from "@/pages/screens/utilities/query/ScreenQueryKeys.ts";

/**
 * # useScreenDeleteMutation Hook
 *
 * React Query mutation hook for deleting a single `Screen` entity.
 *
 * Responsibilities:
 * - Deletes a screen via **ScreenRepository**
 * - Displays success and error toast notifications
 * - Executes optional success and error callbacks
 * - Invalidates screen list queries to refresh cached data
 *
 * @param params
 * Optional deletion lifecycle configuration.
 *
 * @returns
 * React Query mutation result for deleting a screen by ID.
 *
 * @example
 * ```ts
 * const deleteMutation = useScreenDeleteMutation({
 *   onDeleteSuccess: () => console.log("Screen deleted"),
 * });
 *
 * deleteMutation.mutate({ _id: screenId });
 * ```
 */
export default function useScreenDeleteMutation(
    params: OnDeleteMutationParams = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onDeleteSuccess, onDeleteError, successMessage, errorMessage} = params;

    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Executes the deletion request.
     */
    const deleteScreen = async ({_id}: { _id: ObjectId }) => {
        await handleQueryResponse({
            action: () => ScreenRepository.delete({_id}),
            errorMessage: "Failed to delete screen data. Please try again.",
        });
    };

    /**
     * Handles a successful deletion.
     */
    const onSuccess = async () => {
        invalidateQueries(
            [ScreenQueryKeys.query(), ScreenQueryKeys.paginated()],
            {exact: false},
        );

        toast.success(successMessage ?? "Screen deleted.");
        onDeleteSuccess?.();
    };

    /**
     * Handles deletion errors.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Something went wrong. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey: ["delete_single_screen"],
        mutationFn: deleteScreen,
        onSuccess,
        onError,
    });
}
