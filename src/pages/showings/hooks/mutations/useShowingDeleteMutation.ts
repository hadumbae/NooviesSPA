/**
 * @file useShowingDeleteMutation.ts
 *
 * React Query mutation hook for deleting a `Showing`.
 *
 * Handles:
 * - Deletion via {@link ShowingRepository}
 * - Centralized fetch error handling
 * - Toast-based success feedback
 * - Cache invalidation for all Showing list queries
 */

import {useMutation} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {ShowingListQueryKeys} from "@/pages/showings/constants/ShowingQueryKeys.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";

/**
 * Provides a mutation for deleting a single Showing.
 *
 * @param params - Deletion lifecycle callbacks and messaging.
 *
 * @returns
 * A React Query mutation for the Showing delete operation.
 */
export default function useShowingDeleteMutation(params: OnDeleteMutationParams) {
    const {successMessage, onDeleteSuccess, errorMessage, onDeleteError} = params;

    const keys = ShowingListQueryKeys.map(key => [key]);
    const invalidateQueries = useInvalidateQueryKeys({keys, exact: false});

    /**
     * Executes the delete request for a Showing.
     */
    const deleteShowing = async ({_id}: { _id: ObjectId }) => {
        const fetchQueryFn = () => ShowingRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    };

    /**
     * Handles successful deletion.
     */
    const onSuccess = () => {
        invalidateQueries();

        successMessage && toast.error(successMessage);
        onDeleteSuccess?.();
    };

    /**
     * Handles deletion errors.
     */
    const onError = (error: Error | ParseError) => {
        handleMutationResponseError({error, displayMessage: errorMessage});
        onDeleteError?.(error);
    };

    return useMutation({
        mutationKey: ["delete_single_showing"],
        mutationFn: deleteShowing,
        onSuccess,
        onError,
    });
}
