/**
 * @fileoverview React Query mutation hook for deleting a Genre.
 * Handles cache invalidation, toast notifications, and lifecycle callbacks.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {destroy} from "@/domains/genres/_feat/crud";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {GenreCRUDMutationKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDMutationKeys.ts";

type DeleteByID = {
    _id: ObjectId;
};

/**
 * Mutation hook for deleting a genre by its unique identifier.
 */
export default function useDeleteGenre(
    params: MutationResponseConfig
): UseMutationResult<void, unknown, DeleteByID> {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;
    const invalidateData = useInvalidateQueryKeys();

    const deleteGenre = async ({_id}: DeleteByID) => {
        await destroy({_id})
    };

    const onSuccess = () => {
        invalidateData(
            [
                GenreCRUDQueryKeys.paginated({}),
                GenreCRUDQueryKeys.query({}),
                GenreCRUDQueryKeys.queryPaginated({}),
            ],
            {exact: false}
        );

        if (successMessage) toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleMutationResponseError({error, displayMessage: errorMessage});
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: GenreCRUDMutationKeys.destroy(),
        mutationFn: deleteGenre,
        onSuccess,
        onError,
    });
}