/** @fileoverview Mutation hook for deleting movie credits with cache invalidation and notifications. */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {destroy, MovieCreditCRUDMutationKeys, MovieCreditCRUDQueryKeys} from "@/domains/moviecredit/_feat/crud";
import {MutationResponseConfig} from "@/common/features/submit-data";

/** The payload required to identify the credit for deletion. */
type DeleteValue = {
    _id: ObjectId;
}

/**
 * Hook to delete a movie credit, managing the server request, local cache invalidation, and UI feedback.
 */
export function useMovieCreditDeleteMutation(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: MutationResponseConfig = {}
): UseMutationResult<void, unknown, DeleteValue> {
    const invalidateQueries = useInvalidateQueryKeys();

    const deleteMovieCredit = async ({_id}: DeleteValue) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        invalidateQueries(
            [
                MovieCreditCRUDQueryKeys.query({}),
                MovieCreditCRUDQueryKeys.paginated({}),
                MovieCreditCRUDQueryKeys.queryPaginated({}),
            ],
            {exact: false},
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: Error) => {
        const fallbackMessage = errorMessage ?? "Failed to delete movie credit. Please try again.";
        handleMutationResponseError({error, displayMessage: fallbackMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: MovieCreditCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteMovieCredit,
        onSuccess,
        onError,
    });
}