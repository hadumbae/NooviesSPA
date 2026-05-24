/**
 * @fileoverview Hook for deleting theatre entities using a mutation.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {toast} from "react-toastify";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useInvalidateQueryKeys from "@/common/hooks/query/useInvalidateQueryKeys.ts";
import {destroy} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDMutationKeys} from "@/domains/theatres/_feat/crud-hooks/mutationKeys.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/queryKeys.ts";

type DeleteIdentifier = {
    _id: ObjectId;
};

/**
 * Mutation hook for deleting a single theatre by ID.
 */
export function useTheatreDeleteMutation(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: MutationResponseConfig
): UseMutationResult<void, unknown, DeleteIdentifier> {
    const invalidateQueries = useInvalidateQueryKeys();

    const deleteTheatre = async ({_id}: DeleteIdentifier): Promise<void> => {
        await destroy({_id});
    };

    const onSuccess = (): void => {
        invalidateQueries(
            [TheatreCRUDQueryKeys.list()],
            {exact: false},
        );

        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    };

    const onError = (error: unknown): void => {
        errorMessage && toast.error(errorMessage);
        onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: TheatreCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteTheatre,
        onSuccess,
        onError,
    });
}