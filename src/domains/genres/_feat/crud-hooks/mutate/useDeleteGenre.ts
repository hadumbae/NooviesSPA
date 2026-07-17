/**
 * @fileoverview React Query mutation hook for deleting a Genre.
 *
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/_schemas";
import {
    handleSubmitResponseError
} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {destroy} from "@/domains/genres/_feat/crud";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys/GenreCRUDQueryKeys.ts";
import {GenreCRUDMutationKeys} from "@/domains/genres/_feat/crud-hooks/keys/GenreCRUDMutationKeys.ts";

/** Parameters for identifying the genre to be deleted. */
type DeleteByID = {
    _id: ObjectId;
};

/**
 * Hook for deleting a genre by its unique identifier.
 */
export function useDeleteGenre(
    onSubmitConfig: MutationResponseConfig<void, DeleteByID> = {}
): UseMutationResult<void, unknown, DeleteByID> {
    const queryClient = useQueryClient();

    const deleteGenre = async ({_id}: DeleteByID) => {
        onSubmitConfig.submitMessage && toast.success(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.({_id});

        await destroy({_id})
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: GenreCRUDQueryKeys.list(), exact: false});

        if (onSubmitConfig.successMessage) toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleSubmitResponseError({error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: GenreCRUDMutationKeys.destroy(),
        mutationFn: deleteGenre,
        onSuccess,
        onError,
    });
}