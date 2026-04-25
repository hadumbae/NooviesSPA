/**
 * @fileoverview React Query mutation hook for deleting a theatre screen.
 * Orchestrates API interaction, cache invalidation, and standardized user feedback.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {destroy} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";
import {TheatreScreenCRUDMutationKeys} from "@/domains/theatre-screens/_feat/crud-hooks/mutationKeys.ts";

/**
 * Custom hook to handle the deletion of a single Theatre Screen entity.
 */
export function useScreenDeleteMutation(
    params: MutationResponseConfig = {}
): UseMutationResult<void, unknown, { _id: ObjectId }> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const invalidateQueries = useInvalidateQueryKeys();

    /**
     * Performs the asynchronous deletion via the CRUD handler.
     */
    const deleteScreen = async ({_id}: { _id: ObjectId }) => {
        await destroy({_id});
    };

    /**
     * Post-deletion success handler for cache cleanup and notification.
     */
    const onSuccess = async () => {
        // Broadly invalidate screen-related lists to ensure data consistency
        invalidateQueries(
            [
                TheatreScreenCRUDQueryKeys.find({}),
                TheatreScreenCRUDQueryKeys.paginated({}),
                TheatreScreenCRUDQueryKeys.query({}),
                TheatreScreenCRUDQueryKeys.queryPaginated({}),
            ],
            {exact: false},
        );

        toast.success(successMessage ?? "Screen deleted.");
        onSubmitSuccess?.();
    };

    /**
     * Standardized error handler for mutation failures.
     */
    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Something went wrong. Please try again.";
        handleMutationResponseError({error, displayMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: TheatreScreenCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteScreen,
        onSuccess,
        onError,
    });
}