/**
 * @fileoverview Mutation hook for deleting movies with automated cache invalidation and feedback.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {MovieCRUDMutationKeys} from "@/domains/movies/_feat/crud-hooks/mutationKeys.ts";
import {destroy} from "@/domains/movies/_feat/crud";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/queryKeys.ts";

/** Configuration for the movie deletion mutation. */
type DeleteMovieConfig = {
    _id: ObjectId,
};

/** Hook to delete a movie, managing the server request, local cache invalidation, and UI feedback. */
export default function useMovieDeleteMutation(
    {onSubmit, submitMessage, onSubmitSuccess, successMessage, onSubmitError, errorMessage}: MutationResponseConfig = {}
): UseMutationResult<void, unknown, DeleteMovieConfig> {
    const queryClient = useQueryClient();

    /** Executes the movie deletion API call via the MovieRepository. */
    const mutationFn = async ({_id}: DeleteMovieConfig) => {
        await destroy({_id});
        submitMessage && toast.info(submitMessage);
        onSubmit?.();
    };

    /** Provides success feedback and executes the success callback. */
    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieCRUDQueryKeys.list(), exact: false});
        queryClient.invalidateQueries({queryKey: ["movies", "views"], exact: false});

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    };

    /** Standardises error handling with toast notifications and error callbacks. */
    const onError = (error: unknown) => {
        handleMutationResponseError({error, displayMessage: errorMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: MovieCRUDMutationKeys.deleteSingle(),
        mutationFn,
        onSuccess,
        onError,
    });
}