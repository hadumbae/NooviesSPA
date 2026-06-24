/**
 * @fileoverview Hook for deleting theatre entities using a mutation.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {destroy} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDMutationKeys, TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

type DeleteIdentifier = {
    _id: ObjectId;
};

/**
 * Mutation hook for deleting a single theatre by ID.
 */
export function useTheatreDeleteMutation(): UseMutationResult<void, unknown, DeleteIdentifier> {
    const queryClient = useQueryClient();

    const deleteTheatre = async ({_id}: DeleteIdentifier): Promise<void> => {
        await destroy({_id});
    };

    const onSuccess = (): void => {
        queryClient.invalidateQueries({queryKey: TheatreCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: TheatreCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteTheatre,
        onSuccess,
    });
}